import Eris, { ClientOptions } from "eris";
import { performance } from "perf_hooks";
import * as fs from "fs-extra";
import Event from "@util/events";
import path from "path";
import { GatewayServer, SlashCreator } from 'slash-create';

export default class Lockbox extends Eris.Client {
    constructor(token: string) {
        super(token, {
            restMode: true
        } as ClientOptions);
    }

    async launch() {
        await this.loadEvents();
        await this.loadCommands();
        await this.connect();
    }
    
    async loadEvents() {
        const oStart = performance.now();
        const list = await fs.readdir(path.resolve(__dirname, 'events')).then(v => v.map(ev => `${path.resolve(__dirname, 'events')}/${ev}`));
        for (const loc of list) {
			const start = performance.now();
            let event = await import(loc) as Event | { default: Event; };
            if ("default" in event) event = event.default;
            this.on(event.name, event.listener.bind(this));
			const end = performance.now();
            console.log(`Loaded Event ${event.name}, in ${(end - start).toFixed(3)}ms.`)
        }
        const oEnd = performance.now();
        console.log(`Loaded ${list.length} Event(s), in ${(oEnd - oStart).toFixed(3)}ms.`)
    }

    async loadCommands() {
        const creator = new SlashCreator({
            applicationID: process.env.APPLICATION_ID!,
            token: process.env.TOKEN!,
        })
        creator.withServer(new GatewayServer(
            (handler) => this.on('rawWS', (event) => {
                //@ts-ignore
                if (event.t === 'INTERACTION_CREATE') handler(event.d);
            })
        )).registerCommandsIn(path.join(__dirname, 'commands')).syncGlobalCommands();

        creator.syncCommandsIn('452518336627081236')

        creator.syncCommandPermissions()
        creator.on('synced', () => {
            console.log('Finished syncing Commands!');
        })
        creator.on('debug', (msg) => console.log(`[DEBUG]: ${msg}`));
        creator.on('warn', (msg) => console.warn(`[WARN]: ${msg}`));
        creator.on('error', (msg) => console.error(`[ERROR]: ${msg}`));
        creator.on('commandRun', (cmd, _, ctx) => console.log(`${ctx.member!.user.username}#${ctx.member!.user.discriminator} (${ctx.member!.id}) ran command ${cmd.commandName}`));
        creator.on('commandRegister', (cmd) => console.log(`Registered command ${cmd.commandName}`));
        creator.on('commandUnregister', (cmd) => console.log(`Unregistered command ${cmd.commandName}`));
        creator.on('commandReregister', (cmd) => console.log(`Reregistered command ${cmd.commandName}`));
        creator.on('commandError', (cmd, error) => console.error(`Command ${cmd.commandName}: ${
            error.stack ? error.message + '\n' + error.stack : error.message 
        }`));
        creator.on('commandBlock', (cmd, ctx, reason) => console.log(`Command ${cmd.commandName} was blocked for ${ctx.member!.user.username}#${ctx.member!.user.discriminator}. Reason: ${reason}`));
    }
}
