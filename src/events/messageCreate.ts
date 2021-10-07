import Event from "@util/events";
import Database from "@util/Database";
import { Config } from "@models/Config";
import { bot } from '@root/src/index';
import API from "@util/API";

export default new Event('messageCreate', async function (message) {
	const manager = await Database.getInstance().getManager();
	const config = await (await manager.findOne(Config, message.guildID))!
	if(message.author.bot) return;
	const user = (await bot.getMember('452518336627081236',message.author.id)!)!
	const roles = user.roles
	if (roles.includes('804687246547746876')) return;
	if ((await config.resources).every(resource => roles.includes(resource.discordRole))) {
		user.addRole('804687246547746876', 'User has all plugins')
	}
})