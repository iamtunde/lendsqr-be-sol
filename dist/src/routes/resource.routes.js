"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var express_1 = __importDefault(require("express"));
var resource_controller_1 = require("../controllers/resource/resource.controller");
var route = express_1.default.Router();
exports.Resource = route;
route.get("/banks", resource_controller_1.ResourceController.getBankList);
//# sourceMappingURL=resource.routes.js.map