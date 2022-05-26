"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInput = void 0;
const generateInput = (name, message) => {
    return (defaultAnswer) => ({
        type: 'input',
        name,
        message,
        default: defaultAnswer,
    });
};
exports.generateInput = generateInput;
