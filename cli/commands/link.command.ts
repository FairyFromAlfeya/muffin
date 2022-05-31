import { program } from 'commander';
import { AbstractCommand } from './abstract.command';

export class LinkCommand extends AbstractCommand {
  public load() {
    program
      .command('link')
      .alias('l')
      .description('Link solidity contracts')
      .action(async () => {
        await this.action.handle();
      });
  }
}
