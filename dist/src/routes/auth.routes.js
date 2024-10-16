"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controllers/auth/auth.controller");
var validators_1 = require("../requests/validators");
var middleware_1 = require("../requests/middleware");
var route = express_1.default.Router();
exports.Authentication = route;
route.post("/signUp", [validators_1.signUpValidation, middleware_1.checkBlackList], auth_controller_1.AuthController.signUp);
route.post("/signIn", validators_1.signInValidation, auth_controller_1.AuthController.signIn);
//# sourceMappingURL=auth.routes.js.map