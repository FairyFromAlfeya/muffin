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
const index_1 = require("../lib/runners/index");
const path_1 = require("path");
const fs = require("fs");
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
    const runner = index_1.RunnerFactory.create(index_1.Runner.LINKER);
    const runnerBase64 = index_1.RunnerFactory.create(index_1.Runner.BASE64);
    const files = fs.readdirSync((0, path_1.join)(process.cwd(), 'build'), { withFileTypes: true });
    for (const file of files) {
        if (file.isFile() && file.name.endsWith('.code')) {
            yield runner.run(`compile ${(0, path_1.join)(process.cwd(), 'build', file.name)} -o ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.tvc'))} `);
            yield runnerBase64.run(`< ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.tvc'))} > ${(0, path_1.join)(process.cwd(), 'build', file.name.replace('.code', '.base64'))}`);
        }
    }
    console.info();
});
