"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.InitAction = void 0;
const inquirer = require("inquirer");
const questions_1 = require("../lib/questions/questions");
const index_1 = require("../lib/ui/index");
const formatting_1 = require("../lib/utils/formatting");
const abstract_action_1 = require("./abstract.action");
const index_2 = require("../lib/runners/index");
const path_1 = require("path");
class InitAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const directoryOption = options.find((option) => option.name === 'directory');
            yield askForMissingInformation(inputs);
            const projectDirectory = getProjectDirectory(getApplicationNameInput(inputs), directoryOption);
            yield generateApplicationFiles(projectDirectory).catch(exports.exit);
            process.exit(0);
        });
    }
}
exports.InitAction = InitAction;
const getApplicationNameInput = (inputs) => inputs.find((input) => input.name === 'name');
const getProjectDirectory = (applicationName, directoryOption) => {
    return ((directoryOption && directoryOption.value) ||
        (0, formatting_1.normalizeToKebabOrSnakeCase)(applicationName.value));
};
const askForMissingInformation = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(index_1.MESSAGES.PROJECT_INFORMATION_START);
    console.info();
    const prompt = inquirer.createPromptModule();
    const nameInput = getApplicationNameInput(inputs);
    if (!nameInput.value) {
        const message = 'What name would you like to use for the new project?';
        const questions = [(0, questions_1.generateInput)('name', message)('muffin-app')];
        const answers = yield prompt(questions);
        replaceInputMissingInformation(inputs, answers);
    }
});
const replaceInputMissingInformation = (inputs, answers) => {
    return inputs.map((input) => (input.value =
        input.value !== undefined ? input.value : answers[input.name]));
};
const generateApplicationFiles = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const runner = index_2.RunnerFactory.create(index_2.Runner.COPIER);
    yield runner.run(`-a ${(0, path_1.join)(process.cwd(), '/lib/schematic')} ${dir}`);
    console.info();
});
const exit = () => process.exit(1);
exports.exit = exit;
