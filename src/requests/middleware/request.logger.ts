import { Request, Response, NextFunction } from "express"

export const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const headers = req.headers;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(`============= LOGGING REQUEST @ ${time} =========`);
  console.log(`METHOD: ${req.method} \nENDPOINT: ${req.url}`);
  console.log("BODY: ", { ...body });
  console.log("HEADERS: ", { ...headers });
  console.log("============= REQUEST END ========================");

  next();
};
