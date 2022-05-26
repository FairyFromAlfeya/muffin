"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Runner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class Base64Runner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('base64');
    }
}
exports.Base64Runner = Base64Runner;
