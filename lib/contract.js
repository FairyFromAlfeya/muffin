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
exports.Contract = void 0;
const output_decoder_1 = require("./output-decoder");
const core_1 = require("@tonclient/core");
const utils_1 = require("./utils");
class Contract {
    constructor({ abi, base64, code, name, address, keyPair, autoAnswerIdOnCall, autoRandomNonce, afterRun, }) {
        this.client = new core_1.TonClient({ network: { server_address: (0, utils_1.nodeUrl)() } });
        this.abi = abi;
        this.base64 = base64 || '';
        this.code = code;
        this.name = name;
        this.address = address;
        this.keyPair = keyPair;
        this.afterRun = afterRun === undefined ? () => __awaiter(this, void 0, void 0, function* () { return ({ success: true }); }) : afterRun;
        this.autoAnswerIdOnCall = autoAnswerIdOnCall || true;
        this.autoRandomNonce = autoRandomNonce || true;
    }
    setAddress(address) {
        this.address = address;
    }
    setKeyPair(keyPair) {
        this.keyPair = keyPair;
    }
    run({ method, params, keyPair, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.createRunMessage({
                contract: this,
                method,
                params: params || {},
                keyPair: keyPair || this.keyPair,
            });
            const tx = yield this.waitForRunTransaction({
                message,
                abi: this.abi,
            });
            yield this.afterRun(tx);
            return tx;
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
                abi: {
                    type: 'Contract',
                    value: abi,
                },
            });
        });
    }
    call(method, params, keyPair) {
        return __awaiter(this, void 0, void 0, function* () {
            const extendedParams = params || {};
            if (this.autoAnswerIdOnCall) {
                if (this.abi.functions
                    .find((e) => e.name === method)
                    .inputs.find((e) => e.name === '_answer_id')) {
                    extendedParams._answer_id = extendedParams._answer_id || 1;
                }
                else if (this.abi.functions
                    .find((e) => e.name === method)
                    .inputs.find((e) => e.name === 'answerId')) {
                    extendedParams.answerId = extendedParams.answerId || 1;
                }
            }
            const { message } = yield this.createRunMessage({
                contract: this,
                method,
                params: extendedParams,
                keyPair: keyPair || this.keyPair,
            });
            const { result: [{ boc }] } = yield this.client.net.query_collection({
                collection: 'accounts',
                filter: { id: { eq: this.address } },
                result: 'boc',
            });
            const { decoded } = yield this.client.tvm.run_tvm({
                abi: {
                    type: 'Contract',
                    value: this.abi,
                },
                message,
                account: boc,
            });
            const functionAttributes = this.abi.functions.find(({ name }) => name === method);
            const outputDecoder = new output_decoder_1.OutputDecoder(decoded === null || decoded === void 0 ? void 0 : decoded.output, functionAttributes);
            return outputDecoder.decode();
        });
    }
    decodeMessages(messages, is_internal) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedMessages = messages.map((message) => __awaiter(this, void 0, void 0, function* () {
                const decodedMessage = yield this.client.abi.decode_message_body({
                    abi: {
                        type: 'Contract',
                        value: this.abi,
                    },
                    body: message.body,
                    is_internal,
                });
                return Object.assign(Object.assign({}, decodedMessage), { messageId: message.id, src: message.src, created_at: message.created_at });
            }));
            return Promise.all(decodedMessages);
        });
    }
    getSentMessages(messageType, internal) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result } = yield this.client.net.query_collection({
                collection: 'messages',
                filter: {
                    src: {
                        eq: this.address,
                    },
                    msg_type: {
                        eq: messageType,
                    },
                },
                result: 'body id src created_at',
            });
            return this.decodeMessages(result, internal);
        });
    }
    getEvents(eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sentMessages = yield this.getSentMessages(2, false);
            return sentMessages.filter((message) => message.name === eventName);
        });
    }
    createRunMessage({ contract, method, params, keyPair }) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodeParams = {
                address: contract.address,
                abi: {
                    type: 'Contract',
                    value: contract.abi,
                },
                call_set: {
                    function_name: method,
                    input: params,
                },
                signer: {
                    type: 'None',
                },
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
exports.Contract = Contract;
