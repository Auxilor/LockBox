import { CommandContext, CommandOptionType, MessageOptions, SlashCreator } from 'slash-create'
import Command from '@util/Command'
import Database from '@util/Database';
import { User } from '@models/User';

export class AdminCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'admin',
			guildIDs: '452518336627081236',
			description: 'Lockbox Bot admin commands!',
			requiredPermissions: ['MANAGE_GUILD'],
			options: [
				{
					type: CommandOptionType.SUB_COMMAND,
					name: 'unlink',
					description: 'Unlink discord user',
					options: [
						{
							name: 'userid',
							description: 'Userid to unlink',
							type: CommandOptionType.STRING,
							required: true,
						},
					],
				}
			]
		})
		this.filePath = __filename
	}
	
	async run(ctx: CommandContext): Promise<MessageOptions> {
		const manager = await Database.getInstance().getManager();
		
		const key = Object.keys(ctx.options)[0]
		const options = ctx.options[key]
		
		switch (key) {
			case 'unlink':
			const users = manager.getRepository(User);
			(await users.findOne(options.userid))?.remove()
			
			return { content: 'Unlinked user!', ephemeral: true }
			default:
			return { content: 'Not implemented yet!', ephemeral: true }
		}
		
	}
}