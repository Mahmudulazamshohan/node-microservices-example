import { Request, Response } from "express";

export default {
  name: "utils",
  dependencies: [],
  providers: [],
  controllers: [],
  middlewares: [
    {
      name: "auth",
      handler: (request: Request, response: Response, nextFunc) =>
        nextFunc(),
    },
    {
      name: "admin",
      handler: (request: Request, response: Response, nextFunc) =>
        nextFunc(),
    },
  ],
};
