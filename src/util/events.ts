import { ClientEvents } from "eris";
import Lockbox from "main"

export default class Event<K extends keyof ClientEvents = keyof ClientEvents> {
    name: K
    listener: (this: Lockbox, ...args: ClientEvents[K]) => void;
    constructor(event: K, listener: (this: Lockbox, ...args: ClientEvents[K]) => void) {
        this.name = event;
        this.listener = listener;
    }
}