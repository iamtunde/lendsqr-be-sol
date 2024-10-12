/** @format */

import { Request, Response, NextFunction } from "express";

export function Req() {
  return function (target: any) {
    const methods = Object.getOwnPropertyNames(target.prototype);

    methods.forEach((method) => {
      const original = target.prototype[method];

      if (typeof original === "function") {
        target.prototype[method] = function (
          req: Request,
          res: Response,
          next: NextFunction,
        ) {
          return original.apply(this, [req, res]);
        };
      }
    });
  };
}
