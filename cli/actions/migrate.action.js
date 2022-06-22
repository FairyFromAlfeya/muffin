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
exports.MigrateAction = void 0;
const abstract_action_1 = require("./abstract.action");
const child_process_1 = require("child_process");
const ui_1 = require("../lib/ui");
const chalk = require("chalk");
class MigrateAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info();
            console.info(ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, chalk.bgBlue(`    Deploying ${inputs.find(o => o.name === 'script').value}    `), ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET);
            console.info();
            const child = yield MigrateAction.spawnChildProcess(inputs.find(o => o.name === 'script').value, options.find(o => o.name === 'network').value);
            child.on('exit', () => {
                console.info();
                console.info(ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, chalk.bgBlue(`   ${inputs.find(o => o.name === 'script').value} was deployed  `), ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET, ui_1.EMOJIS.ROCKET);
                console.info();
                process.exit(0);
            });
        });
    }
    static spawnChildProcess(file, network) {
        return (0, child_process_1.spawn)('ts-node', [`migrations/${file}`, network], {
            stdio: 'inherit',
            shell: true,
        });
    }
}
exports.MigrateAction = MigrateAction;
