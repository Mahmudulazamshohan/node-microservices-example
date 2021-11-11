import { Router, Response, Request, Send } from "express";

import UserModel from "../../models/user/user.model";

import { ControllerInterface } from "../../utils/interfaces/controller.interface";

import { AuthMiddleware } from "../../middlewares/auth.middleware";

import HTTPResponse from "../../utils/response";

class UserController implements ControllerInterface {
  public path = "/user";
  public router = Router();

  public middleware = AuthMiddleware;

  constructor() {
    this.intializeRoutes();

    this.router.all("*", this.middleware);
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getSingleUser);
    this.router.get(this.path, this.getSingleUser);
  }

  public getSingleUser(request: Request, response: Response): void {
    HTTPResponse.json<any>(response, {});
  }
}
