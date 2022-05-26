"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesterRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class TesterRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('mocha');
    }
}
exports.TesterRunner = TesterRunner;
