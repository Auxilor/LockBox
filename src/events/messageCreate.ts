import Event from "@util/events";
import Logger from "@util/Logger";
import Database from "@util/Database";
import { Config } from "@models/Config";

export default new Event('messageCreate', async function (message) {
  Logger.info('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  const manager = await Database.getInstance().getManager();
  const resources = await (await manager.findOne(Config, message.guildID))!.resources
  
  console.log(message.member?.roles.every(resource => !!resources.find(r => r.Id === resource)))
})