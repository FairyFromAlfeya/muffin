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
exports.Account = void 0;
const contract_1 = require("./contract");
const utils_1 = require("./utils");
const core_1 = require("@tonclient/core");
class Account extends contract_1.Contract {
    constructor() {
        super(...arguments);
        this.client = new core_1.TonClient({ network: { server_address: 'http://localhost:80/' } });
    }
    runTarget({ contract, method, params, value, keyPair }) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = '';
            if (method) {
                const extendedParams = params || {};
                if (this.autoAnswerIdOnCall) {
                    if (contract.abi.functions
                        .find((e) => e.name === method)
                        .inputs.find((e) => e.name === '_answer_id')) {
                        extendedParams._answer_id = extendedParams._answer_id || 1;
                    }
                    else if (contract.abi.functions
                        .find((e) => e.name === method)
                        .inputs.find((e) => e.name === 'answerId')) {
                        extendedParams.answerId = extendedParams.answerId || 1;
                    }
                }
                const message = yield this.client.abi.encode_message_body({
                    abi: {
                        type: 'Contract',
                        value: contract.abi,
                    },
                    call_set: {
                        function_name: method,
                        input: extendedParams,
                    },
                    signer: {
                        type: 'None',
                    },
                    is_internal: true,
                });
                body = message.body;
            }
            return this.run({
                method: 'sendTransaction',
                params: {
                    dest: contract.address,
                    value: value === undefined
                        ? (0, utils_1.convertCrystal)('2', 'nano')
                        : value,
                    bounce: true,
                    flags: 0,
                    payload: body,
                },
                keyPair: keyPair === undefined ? this.keyPair : keyPair,
            });
        });
    }
}
exports.Account = Account;
