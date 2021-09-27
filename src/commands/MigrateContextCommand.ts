import { ApplicationCommandType, CommandContext, SlashCreator } from 'slash-create';
import Command from '@util/Command';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
            type: ApplicationCommandType.USER,
			name: 'migrate',
		})
		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
		return {
			content: 'User',
			ephemeral: true
		}
	}
}
