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
exports.Giver = void 0;
const contract_1 = require("./contract");
const utils_1 = require("./utils");
const core_1 = require("@tonclient/core");
class Giver {
    constructor() {
        this.client = new core_1.TonClient({ network: { server_address: (0, utils_1.nodeUrl)() } });
        this.giver = new contract_1.Contract(Object.assign(Object.assign({}, (0, utils_1.giver)()), { name: 'Giver' }));
    }
    deployContract({ contract, constructorParams, initParams, keyPair }, amount = (0, utils_1.convertCrystal)(10, 'nano')) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const key = (0, utils_1.giver)().key;
            if (key) {
                const keyPair = yield this.client.crypto.nacl_sign_keypair_from_secret_key({
                    secret: key,
                });
                keyPair.secret = keyPair.secret.slice(0, 64);
                this.giver.setKeyPair(keyPair);
            }
            // Extend init params with random _randomNonce if it's found in ABI and autoRandomNonce is enabled
            const extendedInitParams = initParams || {};
            if (contract.autoRandomNonce) {
                if (contract.abi.data.find((e) => e.name === '_randomNonce')) {
                    extendedInitParams._randomNonce = extendedInitParams._randomNonce || (0, utils_1.getRandomNonce)();
                }
            }
            const { address } = yield this.createDeployMessage({
                contract,
                constructorParams,
                initParams: extendedInitParams,
                keyPair,
            });
            yield ((_a = this.giver) === null || _a === void 0 ? void 0 : _a.run({
                method: 'sendGrams',
                params: { dest: address, amount },
            }));
            // Wait for receiving grams
            yield this.client.net.wait_for_collection({
                collection: 'accounts',
                filter: { id: { eq: address }, balance: { gt: `0x0` } },
                result: 'balance',
            });
            // Send deploy transaction
            const message = yield this.createDeployMessage({
                contract,
                constructorParams,
                initParams: extendedInitParams,
                keyPair,
            });
            yield this.waitForRunTransaction({
                message,
                abi: contract.abi,
            });
            contract.setAddress(address);
            return contract;
        });
    }
    waitForRunTransaction({ message, abi }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shard_block_id } = yield this.client.processing.send_message({
                message: message.message,
                send_events: false,
            });
            return this.client.processing.wait_for_transaction({
                message: message.message,
                shard_block_id,
                send_events: false,
                abi: { type: 'Contract', value: abi },
            });
        });
    }
    createDeployMessage({ contract, constructorParams, initParams, keyPair, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodeParams = {
                abi: { type: 'Contract', value: contract.abi },
                deploy_set: { tvc: contract.base64, initial_data: initParams },
                call_set: { function_name: 'constructor', input: constructorParams || {} },
                signer: { type: 'None' },
            };
            return this.client.abi.encode_message(this.enrichMessageWithKeys(encodeParams, keyPair));
        });
    }
    enrichMessageWithKeys(encodeParams, keyPair) {
        return !keyPair
            ? encodeParams
            : Object.assign(Object.assign({}, encodeParams), { signer: {
                    type: 'Keys',
                    keys: keyPair,
                } });
    }
}
exports.Giver = Giver;
