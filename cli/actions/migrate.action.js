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
class MigrateAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield MigrateAction.spawnChildProcess(inputs.find(o => o.name === 'script').value);
            child.on('exit', () => process.exit(0));
        });
    }
    static spawnChildProcess(file) {
        return (0, child_process_1.spawn)('ts-node', [`migrations/${file}`], {
            stdio: 'inherit',
            shell: true,
        });
    }
}
exports.MigrateAction = MigrateAction;
