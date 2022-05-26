import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class BuildCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('build')
      .alias('b')
      .description('Build solidity contracts')
      .action(async () => {
        await this.action.handle();
      });
  }
}
