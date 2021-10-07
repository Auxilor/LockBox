import { ApplicationCommandType, CommandContext, ComponentType, SlashCreator } from 'slash-create';
import Command from '@util/Command';
import Database from '@util/Database';
import { Config } from '@models/Config';
import API from '@util/API';
import { User } from '@models/User';
import Logger from '@util/Logger';
import { bot } from '@root/src/index';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
            type: ApplicationCommandType.USER,
			name: 'Migrate to Polymart',
		})
		this.filePath = __filename;
	}
	
	async run(ctx: CommandContext) {
		await ctx.defer(true);
		const manager = await Database.getInstance().getManager();
        const config = await manager.findOne(Config, ctx.guildID);

        if (!config) return { content: 'Bot has not been configured correctly.', ephemeral: true }

		let targetUserPolymartId = (await manager.findOne(User, {Id: ctx.targetUser!.id}))?.polymartUserId
		if (!targetUserPolymartId) {
			await ctx.send(`Selected User (${ctx.targetUser?.username}#${ctx.targetUser?.discriminator}) does not have an account linked!`, { components: [] })
			return;
		}

		const roles = (await bot.getMember('452518336627081236', ctx.targetUser!.id)!)!.roles;

		let resources = (await config.resources).filter(item => !roles.includes(item.discordRole))

		let options = await Promise.all(resources.map(async item => {
			const resource = await API.getResourceInfo(parseInt(item.Id), config.apiKey);
			return {
				label: `${resource?.title}`,
				value: `${item.Id}`,
				description: `${resource?.subtitle}`
			};
		}));

		await ctx.send({
			content: '​​​',
			flags: 64,
			components: [{
				type: ComponentType.ACTION_ROW,
				components: [{
					type: ComponentType.SELECT,
					custom_id: 'migrate',
					placeholder: 'Plugin(s) to Migrate',
					max_values: options.length,
					min_values: 1,
					options: [
						...options
					]
				}]
			}]
		})



		ctx.registerComponent('migrate', async (selectCtx) => {
			let targetUserId = (await manager.findOne(User, {Id: ctx.targetUser!.id}))?.polymartUserId
			if (!targetUserId) {
				await selectCtx.editParent(`Selected User (${ctx.targetUser?.username}#${ctx.targetUser?.discriminator}) does not have an account linked!`, { components: [] })
				return;
			}
			let items = selectCtx.values.map(async item => {
				Logger.debug(`trying migrate user for ${item}...`);
				let request = (await API.migrateUser(item, targetUserId!, config.apiKey))
				if (request?.success) {
					return {
						success: request.success,
						item: (await API.getResourceInfo(request.resource.id, config.apiKey))?.title
					}
				}
			})
			selectCtx.editParent(`Migrated User for ${items.map(async items => (await items)?.success ? (await items)?.item : '').join(', ')}`)
		});
	}
}
