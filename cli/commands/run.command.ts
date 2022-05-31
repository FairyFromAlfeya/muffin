import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class RunCommand extends AbstractCommand {
  public load() {
    program
      .command('run')
      .alias('r')
      .description('Run script')
      .option('-s, --script <script>', 'Specify the script\'s name')
      .action(async (command) => {
        const options: Input[] = [];
        options.push({ name: 'script', value: command.script });

        await this.action.handle(undefined, options);
      });
  }
}
