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
exports.LinkAction = void 0;
const abstract_action_1 = require("./abstract.action");
const runners_1 = require("../lib/runners");
const path_1 = require("path");
const fs = require("fs");
const load_configuration_1 = require("../lib/utils/load-configuration");
const chalk = require("chalk");
const ui_1 = require("../lib/ui");
class LinkAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield linkContracts().catch(() => process.exit(1));
            process.exit(0);
        });
    }
}
exports.LinkAction = LinkAction;
const linkContracts = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const configuration = yield (0, load_configuration_1.loadConfiguration)();
    const runner = runners_1.RunnerFactory.create(runners_1.Runner.LINKER, (_b = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.build) === null || _a === void 0 ? void 0 : _a.linker) === null || _b === void 0 ? void 0 : _b.path);
    const runnerBase64 = runners_1.RunnerFactory.create(runners_1.Runner.BASE64);
    const files = fs.readdirSync((0, path_1.join)(process.cwd(), 'build'), { withFileTypes: true });
    const sorted = files.filter((f) => f.isFile() && f.name.endsWith('.code'));
    console.info();
    console.info(ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, chalk.bgBlue(`       Linking ${sorted.length} contracts       `), ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK);
    console.info();
    for (const file of files) {
        if (file.isFile() && file.name.endsWith('.code')) {
            yield runner.run(`compile --lib ${(_c = configuration === null || configuration === void 0 ? void 0 : configuration.build) === null || _c === void 0 ? void 0 : _c.stdlib} ${(0, path_1.join)(process.cwd(), 'build', file.name)} -o ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.tvc'))} `);
            console.info(chalk.blue('[LINKED]'), chalk.green(`${file.name} => ${file.name.replace('.code', '.tvc')}`));
            yield runnerBase64.run(`< ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.tvc'))} > ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.base64'))}`);
            console.info(chalk.blue('[ENCODED]'), chalk.green(`${file.name} => ${file.name.replace('.code', '.base64')}`));
        }
    }
    console.info();
    console.info(ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, chalk.bgBlue('Contracts were linked successfully'), ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK, ui_1.EMOJIS.LINK);
    console.info();
});
