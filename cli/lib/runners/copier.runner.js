"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopierRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class CopierRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('cp');
    }
}
exports.CopierRunner = CopierRunner;
