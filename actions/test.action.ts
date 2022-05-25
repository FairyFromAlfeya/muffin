import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners';;
import { CompilerRunner } from '../lib/runners/compiler.runner';

export class TestAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await linkContracts().catch(() => process.exit(1));

    process.exit(0);
  }
}

const linkContracts = async () => {
  const runner = RunnerFactory.create(Runner.TESTER) as CompilerRunner;
  await runner.run('');

  console.info();
};
