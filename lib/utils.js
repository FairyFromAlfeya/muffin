"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZERO_ADDRESS = exports.getRandomNonce = exports.convertCrystal = exports.loadBase64FromFile = exports.loadJSONFromFile = void 0;
const fs_1 = require("fs");
const bignumber_js_1 = require("bignumber.js");
const loadJSONFromFile = (filePath) => {
    return JSON.parse((0, fs_1.readFileSync)(filePath, 'utf8'));
};
exports.loadJSONFromFile = loadJSONFromFile;
const loadBase64FromFile = (filePath) => {
    return (0, fs_1.readFileSync)(filePath, 'utf8').split('\n').join('');
};
exports.loadBase64FromFile = loadBase64FromFile;
const convertCrystal = (amount, dimension) => {
    const crystalBN = new bignumber_js_1.BigNumber(amount);
    if (dimension === 'nano') {
        return crystalBN.times(Math.pow(10, 9));
    }
    else {
        return crystalBN.div(new bignumber_js_1.BigNumber(10).pow(9));
    }
};
exports.convertCrystal = convertCrystal;
const getRandomNonce = () => (Math.random() * 64000) | 0;
exports.getRandomNonce = getRandomNonce;
exports.ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';
