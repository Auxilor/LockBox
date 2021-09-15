import Lockbox from "main";
import Event from "@util/events";

export default new Event('ready', async function () {
    console.log(`Logged in as ${this.user.username}#${this.user.discriminator}`)
})