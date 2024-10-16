"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomPhoneNumbers = exports.generateRandomString = void 0;
var generateRandomString = function (length) {
    if (length === void 0) { length = 30; }
    var string;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return string.replace("undefined", "");
};
exports.generateRandomString = generateRandomString;
var generateRandomPhoneNumbers = function () {
    return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
};
exports.generateRandomPhoneNumbers = generateRandomPhoneNumbers;
var generateRandomNumber = function (length) {
    if (length === void 0) { length = 5; }
    var result = "";
    var digits = "0123456789";
    for (var i = 0; i < length; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
//# sourceMappingURL=random.strings.js.map