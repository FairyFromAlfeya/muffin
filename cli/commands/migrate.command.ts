import { program } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { setNetwork } from '../../lib/utils';

export class MigrateCommand extends AbstractCommand {
  public load() {
    program
      .command('migrate [script]')
      .alias('m')
      .description('Run migration')
      .option('-n, --network [network]', 'Specify the network', 'local')
      .action(async (script: string, command: any) => {
        const options: Input[] = [];
        options.push({ name: 'network', value: command.network });

        setNetwork(command.network);

        const inputs: Input[] = [];
        inputs.push({ name: 'script', value: script });

        await this.action.handle(inputs, options);
      });
  }
}
