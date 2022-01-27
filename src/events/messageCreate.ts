import Event from "@util/events";
import Database from "@util/Database";
import { Config } from "@models/Config";
import { bot } from '@root/src/index';
import API from "@util/API";
import { User } from "@models/User";

export default new Event('messageCreate', async function (message) {
	const manager = await Database.getInstance().getManager();
	const config = await (await manager.findOne(Config, message.guildID))!
	if (message.author.id  === '420893806049624074') {
		if (message.content === '!test') {
			let targetUserId = (await manager.findOne(User, {Id: '266646920473214978'}))?.polymartUserId;
			let pain = (await API.getUserData(targetUserId!, config.apiKey))?.resources!.map(async item => {
				if (!['Free', 'None'].includes(item.purchaseStatus)) {
					if ((await config.resources).find(r => r.Id === item.id)) {
						return item.id
					}
				}
			})
			
			let pan = (await Promise.all(pain!)).filter(item => item !== undefined);
			
			console.log((await config.resources).filter(item => !pan.includes(item.Id)))
		}
	}
	if(message.author.bot) return;
	const user = (await bot.getMember('452518336627081236',message.author.id)!)!
	const roles = user.roles
	if (roles.includes('804687246547746876')) return;
	if ((await config.resources).every(resource => roles.includes(resource.discordRole))) {
		user.addRole('804687246547746876', 'User has all plugins')
	}
})