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
exports.TestAction = void 0;
const abstract_action_1 = require("./abstract.action");
const runners_1 = require("../lib/runners");
const ui_1 = require("../lib/ui");
const chalk = require("chalk");
class TestAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info();
            console.info(ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, chalk.bgBlue(`    Testing ${inputs.find(o => o.name === 'script').value}    `), ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE);
            yield testContracts(inputs.find(o => o.name === 'script').value)
                .finally(() => {
                console.info();
                console.info(ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, chalk.bgBlue(`    Testing ${inputs.find(o => o.name === 'script').value}    `), ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE, ui_1.EMOJIS.TEST_TUBE);
                console.info();
                process.exit(0);
            });
        });
    }
}
exports.TestAction = TestAction;
const testContracts = (script) => __awaiter(void 0, void 0, void 0, function* () {
    const runner = runners_1.RunnerFactory.create(runners_1.Runner.TESTER);
    yield runner.run(`test/${script}.spec.ts --require ts-node/register --exit --timeout 1000000`, true);
    console.info();
});
