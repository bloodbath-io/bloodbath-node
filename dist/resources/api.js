"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
var https = require('https');
var hostname = 'api.bloodbath.io';
var port = 443;
var path = '/rest';
var httpAdapter = /** @class */ (function () {
    function httpAdapter(apiKey) {
        this.apiKey = apiKey;
    }
    httpAdapter.prototype.get = function (endPath) {
        return this.processHttp(endPath, 'GET');
    };
    httpAdapter.prototype.post = function (endPath, params) {
        return this.processHttp(endPath, 'POST', JSON.stringify(params));
    };
    httpAdapter.prototype.delete = function (endPath) {
        return this.processHttp(endPath, 'DELETE');
    };
    httpAdapter.prototype.processHttp = function (endPath, method, params) {
        var _this = this;
        if (params === void 0) { params = null; }
        return new Promise(function (resolve, reject) {
            var options = _this.options(endPath, method, params);
            var request = https.request(options, function (response) {
                var data = '';
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    if (data)
                        resolve(JSON.parse(data));
                    else
                        resolve(null);
                });
            });
            request.on('error', function (error) {
                reject(error);
            });
            if (params)
                request.write(params);
            request.end();
        });
    };
    httpAdapter.prototype.options = function (endPath, method, params) {
        var headers = { 'authorization': "Bearer " + this.apiKey };
        if (params) {
            headers = Object.assign(headers, {
                'Content-Type': 'application/json',
            });
        }
        return {
            hostname: hostname,
            port: port,
            method: method,
            path: "" + path + endPath,
            headers: headers
        };
    };
    return httpAdapter;
}());
var instance = function (apiKey) {
    return new httpAdapter(apiKey);
};
exports.instance = instance;
