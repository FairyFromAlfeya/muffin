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
exports.BuildAction = void 0;
const abstract_action_1 = require("./abstract.action");
const runners_1 = require("../lib/runners");
const path_1 = require("path");
const glob_1 = require("glob");
const load_configuration_1 = require("../lib/utils/load-configuration");
class BuildAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Compile contracts');
            yield compileContracts().catch(() => process.exit(1));
            process.exit(0);
        });
    }
}
exports.BuildAction = BuildAction;
const compileContracts = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const configuration = yield (0, load_configuration_1.loadConfiguration)();
    console.log(configuration);
    const runner = runners_1.RunnerFactory.create(runners_1.Runner.COMPILER, (_b = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.build) === null || _a === void 0 ? void 0 : _a.compiler) === null || _b === void 0 ? void 0 : _b.path);
    const files = (0, glob_1.sync)('contracts/**/*.sol', { cwd: process.cwd() });
    console.log(files);
    for (const file of files) {
        yield runner.run(`-i ${process.cwd()}/node_modules -o build ${(0, path_1.join)(process.cwd(), file)}`);
    }
    console.info();
});
