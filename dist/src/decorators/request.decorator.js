"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Req = Req;
function Req() {
    return function (target) {
        var methods = Object.getOwnPropertyNames(target.prototype);
        methods.forEach(function (method) {
            var original = target.prototype[method];
            if (typeof original === "function") {
                target.prototype[method] = function (req, res, next) {
                    return original.apply(this, [req, res]);
                };
            }
        });
    };
}
//# sourceMappingURL=request.decorator.js.map