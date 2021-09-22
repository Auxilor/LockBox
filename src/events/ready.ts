import Lockbox from "main";
import Event from "@util/events";
import Database from "@util/Database";
import Logger from "@util/Logger";

export default new Event('ready', async function () {
    Logger.info(`Logged in as ${this.user.username}#${this.user.discriminator}`)

    if (await Database.getInstance().test())
        Logger.debug('Connected to database')
    else
        Logger.error('Database could not connect!')
})