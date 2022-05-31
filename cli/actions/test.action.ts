import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { TesterRunner } from '../lib/runners/tester.runner';
import { EMOJIS } from '../lib/ui';
import * as chalk from 'chalk';

export class TestAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    console.info();
    console.info(EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, chalk.bgBlue(`    Testing ${inputs.find(o => o.name === 'script')!.value}    `), EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE);
    await testContracts(inputs.find(o => o.name === 'script')!.value)
      .finally(() => {
        console.info();
        console.info(EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, chalk.bgBlue(`    Testing ${inputs.find(o => o.name === 'script')!.value}    `), EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE, EMOJIS.TEST_TUBE);
        console.info();
        process.exit(0);
      });
  }
}

const testContracts = async (script: boolean | string) => {
  const runner = RunnerFactory.create(Runner.TESTER) as TesterRunner;
  await runner.run(`test/${script}.spec.ts --require ts-node/register --exit --timeout 1000000`, true);

  console.info();
};
