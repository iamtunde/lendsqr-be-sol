"use strict";
/** @format */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
var requestLogger = function (req, res, next) {
    var body = req.body;
    var headers = req.headers;
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    var day = String(now.getDate()).padStart(2, "0");
    var hours = String(now.getHours()).padStart(2, "0");
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");
    var time = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
    console.log("============= LOGGING REQUEST @ ".concat(time, " ========="));
    console.log("METHOD: ".concat(req.method, " \nENDPOINT: ").concat(req.url));
    console.log("BODY: ", __assign({}, body));
    console.log("HEADERS: ", __assign({}, headers));
    console.log("============= REQUEST END ========================");
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=request.logger.js.map