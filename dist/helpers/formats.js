"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeParams = void 0;
var camelToSnakeCase = function (key) {
    return key.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
};
var serializeParams = function (params) {
    var newObject = {};
    for (var camel in params) {
        var newIndex = camelToSnakeCase(camel);
        var currentParam = params[camel];
        newObject[newIndex] = currentParam;
    }
    return newObject;
};
exports.serializeParams = serializeParams;
