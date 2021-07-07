"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeParams = exports.serializeParams = void 0;
var toSnake = function (key) {
    return key.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
};
var toCamel = function (key) {
    return key.replace(/([-_][a-z])/ig, function ($1) {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};
var isObject = function (object) {
    return object === Object(object) && !Array.isArray(object) && typeof object !== 'function';
};
var serializeParams = function (params) {
    var newObject = {};
    for (var camel in params) {
        var newIndex = toSnake(camel);
        var currentParam = params[camel];
        newObject[newIndex] = currentParam;
    }
    return newObject;
};
exports.serializeParams = serializeParams;
var deserializeParams = function (params) {
    if (isObject(params)) {
        var newObject_1 = {};
        Object.keys(params).forEach(function (key) { newObject_1[toCamel(key)] = exports.deserializeParams(params[key]); });
        return newObject_1;
    }
    else if (Array.isArray(params)) {
        return params.map(function (index) {
            return exports.deserializeParams(index);
        });
    }
    return params;
};
exports.deserializeParams = deserializeParams;
