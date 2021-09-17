import { CommandContext, SlashCreator } from 'slash-create';
import { bot } from '@root/src/index';
import Command from '@util/Command';

export class PingCommand extends Command {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'ping',
			description: 'Get bots Latency'
		})
		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
		return {
			content: `Pong!\nLatency: ${(bot.shards.map(v => v.latency).reduce((a, b) => a+b, 0)/bot.shards.size)}ms.`, ephemeral: true
		}
	}

}
