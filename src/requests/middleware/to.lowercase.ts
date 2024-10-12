/** @format */
import { Request, Response, NextFunction } from "express";

export const toLowerCase = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  const keys = Object.keys(payload);

  keys.map((key) => {
    const data = payload[key].toLowerCase();
    req.body[key] = data;
  });

  next();
};
