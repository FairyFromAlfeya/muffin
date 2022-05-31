"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const chalk = require("chalk");
const commander_1 = require("commander");
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
const gen_evertype_command_1 = require("./gen-evertype.command");
const gen_evertype_action_1 = require("../actions/gen-evertype.action");
const migrate_command_1 = require("./migrate.command");
const migrate_action_1 = require("../actions/migrate.action");
class CommandLoader {
    static load() {
        new init_command_1.InitCommand(new actions_1.InitAction()).load();
        new build_command_1.BuildCommand(new actions_1.BuildAction()).load();
        new link_command_1.LinkCommand(new link_action_1.LinkAction()).load();
        new test_command_1.TestCommand(new test_action_1.TestAction()).load();
        new run_command_1.RunCommand(new run_action_1.RunAction()).load();
        new gen_evertype_command_1.GenEvertypeCommand(new gen_evertype_action_1.GenEvertypeAction()).load();
        new migrate_command_1.MigrateCommand(new migrate_action_1.MigrateAction()).load();
        this.handleInvalidCommand();
    }
    static handleInvalidCommand() {
        commander_1.program.on('command:*', () => {
            console.error(`\n${ui_1.ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, commander_1.program.args.join(' '));
            console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
