import { ApplicationCommandType, CommandContext, SlashCreator } from 'slash-create';
import { bot } from '@root/src/index';
import Command from '@util/Command';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
            type: ApplicationCommandType.USER,
			name: 'migrate',
			description: 'Migrate Purchaces from spigot to polymart'
		})
		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
		return {
			content: `Pong!\nLatency: ${(bot.shards.map(v => v.latency).reduce((a, b) => a+b, 0)/bot.shards.size)}ms.`, ephemeral: true
		}
	}

}
