import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class TestCommand extends AbstractCommand {
  public load() {
    program
      .command('test [script]')
      .alias('t')
      .description('Test solidity contracts with Mocha')
      .action(async (script: string) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        inputs.push({ name: 'script', value: script });

        await this.action.handle(inputs, options);
      });
  }
}
