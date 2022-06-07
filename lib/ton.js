"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ton = void 0;
const utils_1 = require("./utils");
const core_1 = require("@tonclient/core");
const bignumber_js_1 = require("bignumber.js");
class Ton {
    constructor() {
        this.client = new core_1.TonClient({ network: { server_address: (0, utils_1.nodeUrl)() } });
    }
    getBalance(address) {
        return this.client.net
            .query_collection({
            collection: 'accounts',
            filter: { id: { eq: address } },
            result: 'balance',
        })
            .then((response) => new bignumber_js_1.BigNumber(response.result[0].balance));
    }
}
exports.ton = new Ton();
