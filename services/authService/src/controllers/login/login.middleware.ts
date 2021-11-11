import { NextFunction, Response, Request } from "express";

export const DefaultMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  next();
};
