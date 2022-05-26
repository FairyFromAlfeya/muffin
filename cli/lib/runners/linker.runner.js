"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkerRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class LinkerRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('tvm-linker');
    }
}
exports.LinkerRunner = LinkerRunner;
