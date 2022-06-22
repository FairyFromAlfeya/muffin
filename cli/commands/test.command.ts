import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class TestCommand extends AbstractCommand {
  public load() {
    program
      .command('test [script]')
      .alias('t')
      .description('Test solidity contracts with Mocha')
      .option('-n, --network [network]', 'Specify the network', 'local')
      .action(async (script: string, command: any) => {
        const options: Input[] = [];
        options.push({ name: 'network', value: command.network });

        const inputs: Input[] = [];
        inputs.push({ name: 'script', value: script });

        await this.action.handle(inputs, options);
      });
  }
}
