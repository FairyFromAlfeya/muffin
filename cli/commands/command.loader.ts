import * as chalk from 'chalk';
import { CommanderStatic } from 'commander';
import { BuildAction, InitAction } from '../actions';
import { ERROR_PREFIX } from '../lib/ui';
import { InitCommand } from './init.command';
import { BuildCommand } from './build.command';
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
  public static load(program: CommanderStatic): void {
    new InitCommand(new InitAction()).load(program);
    new BuildCommand(new BuildAction()).load(program);
    new LinkCommand(new LinkAction()).load(program);
    new TestCommand(new TestAction()).load(program);
    new RunCommand(new RunAction()).load(program);
    new GenEvertypeCommand(new GenEvertypeAction()).load(program);
    new MigrateCommand(new MigrateAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(`\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
      console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
      process.exit(1);
    });
  }
}
