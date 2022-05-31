import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';
import { TesterRunner } from '../lib/runners/tester.runner';

export class TestAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await testContracts(inputs.find(o => o.name === 'script')!.value).catch(() => process.exit(1));

    process.exit(0);
  }
}

const testContracts = async (script: boolean | string) => {
  const runner = RunnerFactory.create(Runner.TESTER) as TesterRunner;
  await runner.run(`test/${script}.spec.ts --require ts-node/register`);

  console.info();
};
