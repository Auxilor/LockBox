import Event from "@util/events";
import Logger from "@util/Logger";

export default new Event('error', async function (err, id) {
	Logger.getLogger('Bot Errors').error(`ID: ${id}, Error: ${err}`);
})