import Lockbox from "main";
import Event from "@util/events";
import Database from "@util/Database";

export default new Event('ready', async function () {
    console.log(`Logged in as ${this.user.username}#${this.user.discriminator}`)

    if (await Database.getInstance().test())
        console.log('Connected to database')
    else
        console.error('Database could not connect!')
})