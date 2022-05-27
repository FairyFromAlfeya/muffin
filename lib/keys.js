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
exports.keys = void 0;
const core_1 = require("@tonclient/core");
class Keys {
    constructor() {
        this.keyPairs = [];
        this.client = new core_1.TonClient({ network: { server_address: 'http://localhost:80/' } });
    }
    getKeyPairs() {
        return this.keyPairs;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const keysHDPaths = [...Array(20).keys()]
                .map((i) => 'm/44\'/396\'/0\'/0/INDEX'.replace('INDEX', i.toString()));
            if (process.platform !== 'darwin') {
                this.keyPairs = yield Promise.all(keysHDPaths.map((path) => __awaiter(this, void 0, void 0, function* () {
                    return this.client.crypto.mnemonic_derive_sign_keys({
                        dictionary: 1,
                        word_count: 12,
                        phrase: 'illegal object novel cattle drink replace oblige online curtain radio blossom legend',
                        path,
                    });
                })));
            }
            else {
                for (const path of keysHDPaths) {
                    this.keyPairs.push(yield this.client.crypto.mnemonic_derive_sign_keys({
                        dictionary: 1,
                        word_count: 12,
                        phrase: 'illegal object novel cattle drink replace oblige online curtain radio blossom legend',
                        path,
                    }));
                }
            }
        });
    }
}
exports.keys = new Keys();
