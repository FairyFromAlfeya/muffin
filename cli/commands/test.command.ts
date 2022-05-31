import { program } from 'commander';
import { AbstractCommand } from './abstract.command';

export class TestCommand extends AbstractCommand {
  public load() {
    program
      .command('test')
      .alias('t')
      .description('Test solidity contracts with Mocha')
      .action(async () => {
        await this.action.handle();
      });
  }
}
