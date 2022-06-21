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
const ui_1 = require("../lib/ui");
const chalk = require("chalk");
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
    components.forEach((comp) => { obj[comp.name] = solTypeToJs(comp.type, comp.components); });
    return replaceAll(replaceAll(JSON.stringify(obj), '"', ''), ',', '; ');
};
const solTypeToJs = (type, components) => {
    switch (type) {
        case 'uint8':
        case 'uint16':
        case 'uint24':
        case 'uint32':
        case 'uint40':
        case 'uint48':
        case 'uint56':
        case 'uint64':
        case 'uint72':
        case 'uint80':
        case 'uint88':
        case 'uint96':
        case 'uint104':
        case 'uint112':
        case 'uint120':
        case 'uint128':
        case 'uint136':
        case 'uint144':
        case 'uint152':
        case 'uint160':
        case 'uint168':
        case 'uint176':
        case 'uint256':
            return 'BigNumber';
        case 'bool':
            return 'boolean';
        case 'cell':
        case 'address':
            return 'string';
        case 'tuple':
            return tupleToType(components);
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
                case 'uint8':
                case 'uint16':
                case 'uint24':
                case 'uint32':
                case 'uint40':
                case 'uint48':
                case 'uint56':
                case 'uint64':
                case 'uint72':
                case 'uint80':
                case 'uint88':
                case 'uint96':
                case 'uint104':
                case 'uint112':
                case 'uint120':
                case 'uint128':
                case 'uint136':
                case 'uint144':
                case 'uint152':
                case 'uint160':
                case 'uint168':
                case 'uint176':
                case 'uint256':
                    return 'BigNumber';
                case 'bool':
                    return 'boolean';
                case 'tuple':
                case 'optional(tuple)':
                    return tupleToType(components);
                case 'cell':
                case 'address':
                    return 'string';
                default:
                    return type;
            }
        });
        console.info();
        console.info(ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, chalk.bgBlue('        Typing 1 contract        '), ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE);
        console.info();
        const template = Handlebars.compile((0, fs_1.readFileSync)(`${__dirname}/../lib/schematic/contract.hbs`, { encoding: 'utf-8' }));
        const data = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), file), { encoding: 'utf-8' });
        const abi = JSON.parse(data);
        const name = file.match(/\w+\.abi\.json/)[0];
        (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), 'evertype'), { recursive: true });
        const savePath = (0, path_1.join)(process.cwd(), 'evertype', name.replace('abi.json', 'ts'));
        (0, fs_1.writeFileSync)(savePath, template({ class: { name: name.replace('.abi.json', '') }, abi }));
        console.info(chalk.blue('[TYPED]'), chalk.green(`${name} => evertype/${name.replace('abi.json', 'ts')}`));
        console.info();
        console.info(ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, chalk.bgBlue('Contracts were typed successfully'), ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE, ui_1.EMOJIS.FIRE);
    }
    catch (e) {
        console.error(e);
    }
    console.info();
});
