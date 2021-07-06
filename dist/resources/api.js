"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
var axios_1 = require("axios");
var DEFAULT_PATH = 'http://localhost:4000/rest/'; // 'https://api.bloodbath.io/rest/'
var TIMEOUT = 1000;
var baseURL = DEFAULT_PATH;
var instance = function (apiKey) {
    return axios_1.default.create({
        baseURL: baseURL,
        timeout: TIMEOUT,
        headers: { 'authorization': "Bearer " + apiKey }
    });
};
exports.instance = instance;
