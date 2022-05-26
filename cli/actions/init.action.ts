import * as inquirer from 'inquirer';
import { Answers, Question } from 'inquirer';
import { Input } from '../commands/index';
import { generateInput } from '../lib/questions/questions';
import { MESSAGES } from '../lib/ui/index';
import { normalizeToKebabOrSnakeCase } from '../lib/utils/formatting';
import { AbstractAction } from './abstract.action';
import { Runner, RunnerFactory } from '../lib/runners/index';
import { CopierRunner } from '../lib/runners/copier.runner';
import { join } from 'path';

export class InitAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const directoryOption = options.find(
      (option) => option.name === 'directory',
    );

    await askForMissingInformation(inputs);

    const projectDirectory = getProjectDirectory(
      getApplicationNameInput(inputs)!,
      directoryOption,
    );

    await generateApplicationFiles(projectDirectory).catch(exit);

    process.exit(0);
  }
}

const getApplicationNameInput = (inputs: Input[]) =>
  inputs.find((input) => input.name === 'name');

const getProjectDirectory = (
  applicationName: Input,
  directoryOption?: Input,
): string => {
  return (
    (directoryOption && (directoryOption.value as string)) ||
    normalizeToKebabOrSnakeCase(applicationName.value as string)
  );
};

const askForMissingInformation = async (inputs: Input[]) => {
  console.info(MESSAGES.PROJECT_INFORMATION_START);
  console.info();

  const prompt: inquirer.PromptModule = inquirer.createPromptModule();
  const nameInput = getApplicationNameInput(inputs);

  if (!nameInput!.value) {
    const message = 'What name would you like to use for the new project?';
    const questions = [generateInput('name', message)('muffin-app')];
    const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
    replaceInputMissingInformation(inputs, answers);
  }
};

const replaceInputMissingInformation = (
  inputs: Input[],
  answers: Answers,
): Input[] => {
  return inputs.map(
    (input) =>
      (input.value =
        input.value !== undefined ? input.value : answers[input.name]),
  );
};

const generateApplicationFiles = async (dir: string) => {
  const runner = RunnerFactory.create(Runner.COPIER) as CopierRunner;

  await runner.run(`-a ${join(process.cwd(), '/lib/schematic')} ${dir}`);

  console.info();
};

export const exit = () => process.exit(1);
