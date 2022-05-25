import { EMOJIS } from './emojis';

export const MESSAGES = {
  PROJECT_INFORMATION_START: `${EMOJIS.ZAP} Creating a template for your project...`,
  RUNNER_EXECUTION_ERROR: (command: string) =>
    `\nFailed to execute command: ${command}`,
};
