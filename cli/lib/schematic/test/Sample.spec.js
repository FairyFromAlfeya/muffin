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
const chai_1 = require("chai");
const locklift_1 = require("./../../locklift");
let Sample;
let sample;
const getRandomNonce = () => (Math.random() * 64000) | 0;
describe('Test Sample contract', function () {
    return __awaiter(this, void 0, void 0, function* () {
        describe('Contracts', function () {
            return __awaiter(this, void 0, void 0, function* () {
                it('Load contract factory', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        Sample = yield locklift_1.default.factory.getContract('Sample');
                        (0, chai_1.expect)(Sample.code).not.to.equal(undefined, 'Code should be available');
                        (0, chai_1.expect)(Sample.abi).not.to.equal(undefined, 'ABI should be available');
                    });
                });
                it('Deploy contract', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        this.timeout(20000);
                        const [keyPair] = yield locklift_1.default.keys.getKeyPairs();
                        sample = yield locklift_1.default.giver.deployContract({
                            contract: Sample,
                            constructorParams: {
                                _state: 123,
                            },
                            initParams: {
                                _nonce: getRandomNonce(),
                            },
                            keyPair,
                        });
                        (0, chai_1.expect)(sample.address)
                            .to.be.a('string')
                            .and.satisfy((s) => s.startsWith('0:'), 'Bad future address');
                    });
                });
                it('Interact with contract', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield sample.run({
                            method: 'setState',
                            params: { _state: 111 },
                        });
                        const response = yield sample.call({
                            method: 'getDetails',
                            params: {},
                        });
                        (0, chai_1.expect)(response.toNumber()).to.be.equal(111, 'Wrong state');
                    });
                });
            });
        });
    });
});
