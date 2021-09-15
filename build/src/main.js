"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = __importDefault(require("eris"));
const perf_hooks_1 = require("perf_hooks");
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class Lockbox extends eris_1.default.Client {
    constructor(token) {
        super(token, {});
    }
    async launch() {
        await this.loadEvents();
        // await this.loadCommands();
    }
    async loadEvents() {
        const oStart = perf_hooks_1.performance.now();
        const list = await fs.readdir(path_1.default.resolve(__dirname, 'events')).then(v => v.map(ev => `${path_1.default.resolve(__dirname, 'events')}/${ev}`));
        for (const loc of list) {
            const start = perf_hooks_1.performance.now();
            let event = await Promise.resolve().then(() => __importStar(require(loc)));
            if ("default" in event)
                event = event.default;
            this.on(event.name, event.listener.bind(this));
            const end = perf_hooks_1.performance.now();
            console.log(`Loaded event ${event.name}, in ${(end - start).toFixed(3)}ms.`);
        }
        const oEnd = perf_hooks_1.performance.now();
        console.log(`Loaded ${list.length}, in ${(oEnd - oStart).toFixed(3)}ms.`);
    }
}
exports.default = Lockbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQywyQ0FBeUM7QUFDekMsNkNBQStCO0FBRS9CLGdEQUF3QjtBQUV4QixNQUFxQixPQUFRLFNBQVEsY0FBSSxDQUFDLE1BQU07SUFDNUMsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBbUIsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDWixNQUFNLE1BQU0sR0FBRyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0SSxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtZQUM3QixNQUFNLEtBQUssR0FBRyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksS0FBSyxHQUFHLHdEQUFhLEdBQUcsR0FBZ0MsQ0FBQztZQUM3RCxJQUFJLFNBQVMsSUFBSSxLQUFLO2dCQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sR0FBRyxHQUFHLHdCQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQy9FO1FBQ0QsTUFBTSxJQUFJLEdBQUcsd0JBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzdFLENBQUM7Q0FFSjtBQXpCRCwwQkF5QkMifQ==