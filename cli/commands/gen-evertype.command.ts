import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class GenEvertypeCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('gen-evertype')
      .alias('ge')
      .description('Generate evertype interfaces for contracts')
      .option('-f, --file [directory]', 'Specify the abi file')
      .action(async (command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'file', value: command.file });

        const inputs: Input[] = [];

        await this.action.handle(inputs, options);
      });
  }
}
