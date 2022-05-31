import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class MigrateCommand extends AbstractCommand {
  public load() {
    program
      .command('migrate [script]')
      .alias('m')
      .description('Run migration')
      .action(async (script: string) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        inputs.push({ name: 'script', value: script });

        await this.action.handle(inputs, options);
      });
  }
}
