import Eris, { ClientOptions } from "eris";
import { performance } from "perf_hooks";
import * as fs from "fs-extra";
import Event from "@util/events";
import path from "path";

export default class Lockbox extends Eris.Client {
    constructor(token: string) {
        super(token, {} as ClientOptions);
    }

    async launch() {
        await this.loadEvents();
        // await this.loadCommands();
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
            console.log(`Loaded event ${event.name}, in ${(end - start).toFixed(3)}ms.`)
        }
        const oEnd = performance.now();
        console.log(`Loaded ${list.length}, in ${(oEnd - oStart).toFixed(3)}ms.`)
    }

}