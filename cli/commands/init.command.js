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
exports.InitCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class InitCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('init [name]')
            .alias('i')
            .description('Generate Everscale project')
            .option('-d, --directory [directory]', 'Specify the destination directory')
            .action((name, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'directory', value: command.directory });
            const inputs = [];
            inputs.push({ name: 'name', value: name });
            yield this.action.handle(inputs, options);
        }));
    }
}
exports.InitCommand = InitCommand;
