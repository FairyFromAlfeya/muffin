"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlebarRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class HandlebarRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('handlebars');
    }
}
exports.HandlebarRunner = HandlebarRunner;
