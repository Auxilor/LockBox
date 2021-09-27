import Event from "@util/events";
import Logger from "@util/Logger";
import Database from "@util/Database";
import { Config } from "@models/Config";
import { bot } from '@root/src/index';

export default new Event('messageCreate', async function (message) {
  if(message.author.bot) return;
  const user = (await bot.getMember('452518336627081236',message.author.id)!)!
  const roles = user.roles 
  if (roles.includes('804687246547746876')) return;
  const manager = await Database.getInstance().getManager();
  const resources = await (await manager.findOne(Config, message.guildID))!.resources
  if (resources.every(resource => roles.includes(resource.discordRole))) {
    user.addRole('804687246547746876', 'User has all plugins')
  }
})