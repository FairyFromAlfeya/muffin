import * as chalk from 'chalk';
import { program } from 'commander';
import { CompileAction, InitAction } from '../actions';
import { ERROR_PREFIX } from '../lib/ui';
import { InitCommand } from './init.command';
import { CompileCommand } from './compile.command';
import { LinkCommand } from './link.command';
import { LinkAction } from '../actions/link.action';
import { TestCommand } from './test.command';
import { TestAction } from '../actions/test.action';
import { RunCommand } from './run.command';
import { RunAction } from '../actions/run.action';
import { GenEvertypeCommand } from './gen-evertype.command';
import { GenEvertypeAction } from '../actions/gen-evertype.action';
import { MigrateCommand } from './migrate.command';
import { MigrateAction } from '../actions/migrate.action';

export class CommandLoader {
  public static load(): void {
    new InitCommand(new InitAction()).load();
    new CompileCommand(new CompileAction()).load();
    new LinkCommand(new LinkAction()).load();
    new TestCommand(new TestAction()).load();
    new RunCommand(new RunAction()).load();
    new GenEvertypeCommand(new GenEvertypeAction()).load();
    new MigrateCommand(new MigrateAction()).load();

    this.handleInvalidCommand();
  }

  private static handleInvalidCommand() {
    program.on('command:*', () => {
      console.error(`\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
      console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
      process.exit(1);
    });
  }
}
