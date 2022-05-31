import { program } from 'commander';
import { AbstractCommand } from './abstract.command';

export class CompileCommand extends AbstractCommand {
  public load() {
    program
      .command('compile')
      .alias('c')
      .description('Compile solidity contracts')
      .action(async () => {
        await this.action.handle();
      });
  }
}
