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
        const manager = await Database.getInstance().getManager();
        const config = await manager.findOne(Config, ctx.guildID);

        if(!config) {
            return {
                content: 'Bot has not be configured correctly!',
                ephemeral: true
            }
        }

        let user = await manager.findOne(User, ctx.member!.id)

        const resources = await config.resources;

        if (!config.apiKey) {
            return {
                content: 'Bot has not been configured correctly. Missing API KEY',
                ephemeral: true,
            }
        }

        if(!user) {
            if(!ctx.options.token)  return { content: `Get your token [here](${verifyURL})`, ephemeral: true }

            const userID = await API.verifyUser(<string>ctx.options.token)
            if (!userID) return { content: 'Verification Failed', ephemeral: true }

            if (await manager.findOne(User, { polymartUserId: userID })) {
                return {
                    content: 'Verification Failed - Account already linked',
                    ephemeral: true,
                }
            }

            user = new User(ctx.member!.id, userID)
            await user.save()
        }

        const addedRoles: string[] = [];

        const userData = await API.getUserData(user.polymartUserId, config.apiKey)
        if (!userData) return { content: 'An error occured fetching user data!', ephemeral: true }
        for (const resource of userData.resources) {
            console.time('Loop');
            if (resource.purchaseStatus !== 'Free') {
                const resourceConfig = resources.find(r => r.Id === resource.id)
                if (resourceConfig!) {  
                    try {
                        bot.addGuildMemberRole('452518336627081236', ctx.user.id, resourceConfig.discordRole);
                        addedRoles.push(resourceConfig.discordRole)
                    } catch (e) {
                        return {
                            content: `Failed to add role: ${resourceConfig.discordRole}`,
                            ephemeral: true
                        }
                    }
                } 
            }            
            console.timeEnd('Loop')
        }
        console.log((await bot.getRESTGuild('452518336627081236')).roles)
        // Logger.info(addedRoles.map())
        let response = {
            ephemeral: true,
            content: ''
        }
        if (!addedRoles) {
            response.content = `You don't own any plugins on Polymart!`
        } else {
            response.content = `Verified you for ${addedRoles.map(i => bot.guilds.get(ctx.guildID!)?.roles.get(i)?.name).join(', ')}!`
        }
        return response;
	}
}
