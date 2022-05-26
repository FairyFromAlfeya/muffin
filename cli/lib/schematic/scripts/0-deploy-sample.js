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
const getRandomNonce = () => (Math.random() * 64000) | 0;
const locklift_1 = require("./../../locklift");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const Sample = yield locklift_1.default.factory.getContract('Sample');
        const [keyPair] = yield locklift_1.default.keys.getKeyPairs();
        const sample = yield locklift_1.default.giver.deployContract({
            contract: Sample,
            constructorParams: {
                _state: 123,
            },
            initParams: {
                _nonce: getRandomNonce(),
            },
            keyPair,
        });
        console.log(`Sample deployed at: ${sample.address}`);
    });
}
main()
    .then(() => process.exit(0))
    .catch((e) => {
    console.log(e);
    process.exit(1);
});
