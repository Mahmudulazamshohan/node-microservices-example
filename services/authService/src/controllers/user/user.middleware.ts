import { NextFunction, Response, Request } from "express";

export const UserMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  next();
};
