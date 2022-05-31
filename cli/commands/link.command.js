"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkCommand = void 0;
const commander_1 = require("commander");
const abstract_command_1 = require("./abstract.command");
class LinkCommand extends abstract_command_1.AbstractCommand {
    load() {
        commander_1.program
            .command('link')
            .alias('l')
            .description('Link solidity contracts')
            .action(() => __awaiter(this, void 0, void 0, function* () {
            yield this.action.handle();
        }));
    }
}
exports.LinkCommand = LinkCommand;
