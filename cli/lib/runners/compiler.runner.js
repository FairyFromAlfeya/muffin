"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class CompilerRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('solc-ton');
    }
}
exports.CompilerRunner = CompilerRunner;
