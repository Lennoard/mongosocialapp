import { Response, Request, NextFunction } from "express";

export const LogMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const method = req.method;
  let dateISO = new Date().toISOString();
  console.log(`${dateISO} | DEBUG: ${method} ${req.originalUrl}`);
  return next();
};
