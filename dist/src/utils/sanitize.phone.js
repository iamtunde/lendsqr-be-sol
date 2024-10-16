"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNubanFromPhone = exports.includePlusSign = exports.removePlusSign = void 0;
var removePlusSign = function (string) {
    return string.replace("+", "");
};
exports.removePlusSign = removePlusSign;
var includePlusSign = function (string) {
    return "+".concat(string);
};
exports.includePlusSign = includePlusSign;
var createNubanFromPhone = function (string) {
    return string.replace("234", "");
};
exports.createNubanFromPhone = createNubanFromPhone;
//# sourceMappingURL=sanitize.phone.js.map