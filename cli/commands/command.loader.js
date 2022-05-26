"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const chalk = require("chalk");
const actions_1 = require("../actions");
const ui_1 = require("../lib/ui");
const init_command_1 = require("./init.command");
const build_command_1 = require("./build.command");
const link_command_1 = require("./link.command");
const link_action_1 = require("../actions/link.action");
const test_command_1 = require("./test.command");
const test_action_1 = require("../actions/test.action");
const run_command_1 = require("./run.command");
const run_action_1 = require("../actions/run.action");
class CommandLoader {
    static load(program) {
        new init_command_1.InitCommand(new actions_1.InitAction()).load(program);
        new build_command_1.BuildCommand(new actions_1.BuildAction()).load(program);
        new link_command_1.LinkCommand(new link_action_1.LinkAction()).load(program);
        new test_command_1.TestCommand(new test_action_1.TestAction()).load(program);
        new run_command_1.RunCommand(new run_action_1.RunAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${ui_1.ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
