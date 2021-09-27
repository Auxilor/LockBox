import { CommandContext, CommandOptionType, SlashCreator } from 'slash-create';
import Command from '@util/Command';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'migrate',
			description: 'Migrate Plugins from Spigot to polymart.',
            options: [{
                type: CommandOptionType.STRING,
                name: 'plugin',
                description: 'Enter a greeting!',
                required: true,
                autocomplete: true
            }]
		})
		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
		return {
            context: 'yepcock',
            ephemeral: true
		}
	}

}
