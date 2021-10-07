import { CommandContext, SlashCreator, CommandOptionType } from 'slash-create';
import { bot, verifyURL } from '@root/src/index';
import Command from '@util/Command';
import API from '@util/API';
import Database from '@util/Database';
import { User } from '../models/User';
import { Config } from '../models/Config';
import Logger from '@util/Logger';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'verify',
            description: 'Verify your discord account using Polymart',
            options: [
                {
                    type: CommandOptionType.STRING,
                    name: 'token',
                    description: 'Token from Polymart',
                    required: false,
                },
            ],
		})
		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
        await ctx.defer(true);

        const manager = await Database.getInstance().getManager();
        const config = await manager.findOne(Config, ctx.guildID);

        if(!config) {
            ctx.send('Bot has not be configured correctly!', { ephemeral: true });
            return;
        }

        let user = await manager.findOne(User, ctx.member!.id)

        const resources = await config.resources;

        if (!config.apiKey) {
            ctx.send('Bot has not been configured correctly. Missing API KEY', { ephemeral: true })
            return;
        }

        if(!user) {
            if(!ctx.options.token) {
                ctx.send(`Get your token [here](${verifyURL})`, { ephemeral: true })
                return;
            }

            const userID = await API.verifyUser(<string>ctx.options.token)
            if (!userID) {
                ctx.send('Verification Failed', { ephemeral: true })
                return;
            }
            
            if (await manager.findOne(User, { polymartUserId: userID })) {
                ctx.send('Verification Failed - Account already linked', { ephemeral: true })
                return;
            }

            user = new User(ctx.member!.id, userID)
            await user.save()
        }

        const addedRoles: string[] = [];
        const userData = await API.getUserData(user.polymartUserId, config.apiKey)
        if (!userData) {
            ctx.send('An error occured fetching user data!', { ephemeral: true })
            return;
        }
        for (const resource of userData.resources) {
            if (!['Free', 'None'].includes(resource.purchaseStatus)) {
                const resourceConfig = resources.find(r => r.Id === resource.id)
                if (resourceConfig!) {  
                    try {
                        bot.addGuildUserRole('452518336627081236', ctx.user.id, resourceConfig.discordRole).then( i => {
                            if(i.success) {
                                addedRoles.push(resourceConfig.discordRole)
                            } else if (i.message === 'User already has role') {
                                addedRoles.push(resourceConfig.discordRole)
                            }
                        })
                    } catch (e) {
                        
                    }
                } 
            }            
        }
        let guildRoles = (await (bot.getRESTGuild('452518336627081236'))).roles

        if (!addedRoles.length) {
            ctx.send(`You don't own any plugins on Polymart!\nYou can transfer them using these links:\n${resources.map(i => 'https://polymart.org/resource/' + i.Id + '/?intent=transfer-license').join('\n')}`, { ephemeral: true })
            return;
        } else {
            ctx.send(`Verified you for **${addedRoles.map(i => guildRoles.get(i)?.name).join('**, **')}**!`, { ephemeral: true })
            return;
        }
	}
}
