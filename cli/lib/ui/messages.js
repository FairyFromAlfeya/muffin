"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
const emojis_1 = require("./emojis");
exports.MESSAGES = {
    PROJECT_INFORMATION_START: `${emojis_1.EMOJIS.ZAP} Creating a template for your project...`,
    RUNNER_EXECUTION_ERROR: (command) => `\nFailed to execute command: ${command}`,
};
