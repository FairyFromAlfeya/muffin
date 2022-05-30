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
exports.factory = void 0;
const path_1 = require("path");
const utils_1 = require("./utils");
const contract_1 = require("./contract");
const account_1 = require("./account");
const core_1 = require("@tonclient/core");
class Factory {
    constructor() {
        this.client = new core_1.TonClient({ network: { server_address: 'http://localhost:80/' } });
    }
    initializeContract(name, resolvedPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const base64 = (0, utils_1.loadBase64FromFile)(`${resolvedPath}/${name}.base64`);
            const abi = (0, utils_1.loadJSONFromFile)(`${resolvedPath}/${name}.abi.json`);
            const { code } = yield this.client.boc.get_code_from_tvc({ tvc: base64, });
            return new contract_1.Contract({
                abi,
                base64,
                code,
                name,
            });
        });
    }
    getContract(name, build = 'build') {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedBuildPath = (0, path_1.resolve)(process.cwd(), build);
            return this.initializeContract(name, resolvedBuildPath);
        });
    }
    getAccount(name = 'Account', build = 'build') {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedBuildPath = (0, path_1.resolve)(process.cwd(), build);
            const contract = yield this.initializeContract(name, resolvedBuildPath);
            return new account_1.Account({
                abi: contract.abi,
                base64: contract.base64,
                code: contract.code,
                name: contract.name,
            });
        });
    }
}
exports.factory = new Factory();
