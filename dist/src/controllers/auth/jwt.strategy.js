"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.signToken = void 0;
/** @format */
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var errors_1 = require("../../errors");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../../.env"),
});
var secret = process.env.JWT_SECRET;
var encryptionKey = process.env.ENCRYPTION_KEY;
// Function to encrypt data
var encrypt = function (text) {
    var iv = crypto_1.default.randomBytes(16);
    var cipher = crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey), iv);
    var encryptedString = cipher.update(text);
    encryptedString = Buffer.concat([encryptedString, cipher.final()]);
    return iv.toString("hex") + ":" + encryptedString.toString("hex");
};
// Function to decrypt data
var decrypt = function (text) {
    var parts = text.split(":");
    var iv = Buffer.from(parts.shift(), "hex");
    var encryptedString = Buffer.from(parts.join(":"), "hex");
    var decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey), iv);
    var decryptedData = decipher.update(encryptedString);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    return decryptedData.toString();
};
// Function to encrypt the signed JWT twice
var doubleEncryptJwt = function (signedToken) {
    var encryptedString = encrypt(signedToken);
    return encrypt(encryptedString);
};
var signToken = function (payload) {
    try {
        var signedToken = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1h" });
        return doubleEncryptJwt(signedToken);
    }
    catch (err) {
        console.log(err);
    }
};
exports.signToken = signToken;
var decryptToken = function (token) {
    try {
        var decryptedOnce = decrypt(token);
        var decryptedTwice = decrypt(decryptedOnce);
        return jsonwebtoken_1.default.verify(decryptedTwice, secret, { ignoreExpiration: false });
    }
    catch (error) {
        if (error.name === "JsonWebTokenError") {
            // Invalid token format or signature
            throw new errors_1.UnauthorizedError("Invalid token format or signature.");
        }
        else if (error.name === "TokenExpiredError") {
            // Token has expired
            throw new errors_1.UnauthorizedError("Authorization token is expired.");
        }
        else {
            // Other decryption or verification errors
            throw new errors_1.UnauthorizedError("Token decryption or verification failed.");
        }
    }
};
exports.decryptToken = decryptToken;
//# sourceMappingURL=jwt.strategy.js.map