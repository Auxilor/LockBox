"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = __importDefault(require("source-map-support"));
const path_1 = __importDefault(require("path"));
const module_alias_1 = __importDefault(require("module-alias"));
const d = path_1.default.resolve(`${__dirname}/../../`);
source_map_support_1.default.install({ hookRequire: true });
module_alias_1.default.addAliases({
    "@root": d,
    "@util": `${d}/src/util`,
    "@Lockbox": `${d}/src/main`,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ua2V5UGF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9Nb25rZXlQYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUF1QztBQUN2QyxnREFBd0I7QUFDeEIsZ0VBQXVDO0FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0FBRTlDLDRCQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDckMsc0JBQVcsQ0FBQyxVQUFVLENBQUM7SUFDdEIsT0FBTyxFQUFFLENBQUM7SUFDVixPQUFPLEVBQUUsR0FBRyxDQUFDLFdBQVc7SUFDeEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0NBQzNCLENBQUMsQ0FBQyJ9