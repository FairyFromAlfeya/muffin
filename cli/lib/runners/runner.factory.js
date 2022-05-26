"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerFactory = void 0;
const chalk = require("chalk");
const runner_1 = require("./runner");
const copier_runner_1 = require("./copier.runner");
const compiler_runner_1 = require("./compiler.runner");
const linker_runner_1 = require("./linker.runner");
const tester_runner_1 = require("./tester.runner");
const base64_runner_1 = require("./base64.runner");
class RunnerFactory {
    static create(runner, options) {
        switch (runner) {
            case runner_1.Runner.COPIER:
                return new copier_runner_1.CopierRunner();
            case runner_1.Runner.COMPILER:
                return new compiler_runner_1.CompilerRunner(options);
            case runner_1.Runner.LINKER:
                return new linker_runner_1.LinkerRunner(options);
            case runner_1.Runner.TESTER:
                return new tester_runner_1.TesterRunner();
            case runner_1.Runner.BASE64:
                return new base64_runner_1.Base64Runner();
            default:
                console.info(chalk.yellow(`[WARN] Unsupported runner: ${runner}`));
        }
    }
}
exports.RunnerFactory = RunnerFactory;
