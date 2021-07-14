"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./resources/api");
var formats_1 = require("./helpers/formats");
var Bloodbath = /** @class */ (function () {
    function Bloodbath(apiKey) {
        this.apiKey = apiKey;
    }
    Bloodbath.prototype.scheduleEvent = function (params) {
        return this.filterResponse(api_1.instance(this.apiKey).post('/events', formats_1.serializeParams(params)));
    };
    Bloodbath.prototype.listEvents = function () {
        return this.filterResponse(api_1.instance(this.apiKey).get('/events'));
    };
    Bloodbath.prototype.findEvent = function (id) {
        return this.filterResponse(api_1.instance(this.apiKey).get("/events/" + id));
    };
    Bloodbath.prototype.cancelEvent = function (id) {
        return this.filterResponse(api_1.instance(this.apiKey).delete("/events/" + id));
    };
    Bloodbath.prototype.filterResponse = function (apiCall) {
        return new Promise(function (resolve, reject) {
            apiCall.then(function (response) {
                resolve(formats_1.deserializeParams(response.data));
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    return Bloodbath;
}());
var BloodbathExport = function (apiKey) {
    var self = _this;
    if (!(self instanceof Bloodbath))
        return new Bloodbath(apiKey);
    return Bloodbath;
};
module.exports = BloodbathExport;
module.exports.Bloodbath = BloodbathExport;
module.exports.default = BloodbathExport;
