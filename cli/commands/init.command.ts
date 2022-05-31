import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class InitCommand extends AbstractCommand {
  public load() {
    program
      .command('init [name]')
      .alias('i')
      .description('Generate Everscale project')
      .option('-d, --directory [directory]', 'Specify the destination directory')
      .action(async (name: string, command: any) => {
        const options: Input[] = [];
        options.push({ name: 'directory', value: command.directory });

        const inputs: Input[] = [];
        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }
}
