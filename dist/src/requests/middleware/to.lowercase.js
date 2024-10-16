"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowerCase = void 0;
var toLowerCase = function (req, res, next) {
    var payload = req.body;
    var keys = Object.keys(payload);
    keys.map(function (key) {
        var data = payload[key].toLowerCase();
        req.body[key] = data;
    });
    next();
};
exports.toLowerCase = toLowerCase;
//# sourceMappingURL=to.lowercase.js.map