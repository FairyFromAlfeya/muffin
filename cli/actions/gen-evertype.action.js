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
exports.GenEvertypeAction = void 0;
const abstract_action_1 = require("./abstract.action");
const fs_1 = require("fs");
const path_1 = require("path");
const Handlebars = require("handlebars");
class GenEvertypeAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = options.find((opt) => opt.name === 'file').value;
            yield genEvertype(filePath).catch(() => process.exit(1));
            process.exit(0);
        });
    }
}
exports.GenEvertypeAction = GenEvertypeAction;
const replaceAll = function (str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
};
const tupleToType = (components) => {
    const obj = {};
    components.forEach((comp) => { obj[comp.name] = solTypeToJs(comp.type); });
    return replaceAll(replaceAll(JSON.stringify(obj), '"', ''), ',', '; ');
};
const solTypeToJs = (type) => {
    switch (type) {
        case 'uint64':
        case 'uint32':
        case 'uint256':
            return 'BigNumber';
        case 'bool':
            return 'boolean';
        default:
            return type;
    }
};
const genEvertype = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Handlebars.registerHelper('IfNotEquals', (arg1, arg2, options) => {
            return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
        });
        Handlebars.registerHelper('Type', (type, components) => {
            switch (type) {
                case 'uint64':
                case 'uint32':
                case 'uint256':
                    return 'BigNumber';
                case 'bool':
                    return 'boolean';
                case 'tuple':
                    return tupleToType(components);
                default:
                    return type;
            }
        });
        const template = Handlebars.compile((0, fs_1.readFileSync)(`${__dirname}/../lib/schematic/contract.hbs`, { encoding: 'utf-8' }));
        const data = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), file), { encoding: 'utf-8' });
        const abi = JSON.parse(data);
        const name = file.match(/\w+\.abi\.json/)[0];
        const savePath = (0, path_1.join)(process.cwd(), 'evertype', name.replace('abi.json', 'ts'));
        (0, fs_1.writeFileSync)(savePath, template({ class: { name: name.replace('.abi.json', '') }, abi }));
    }
    catch (e) {
        console.error(e);
    }
    console.info();
});