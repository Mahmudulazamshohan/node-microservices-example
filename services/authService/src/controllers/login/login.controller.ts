import { Router, Response, Request } from "express";
import * as express from "express";
import { ControllerInterface } from "../../utils/interfaces/controller.interface";

import { AuthMiddleware } from "../../middlewares/auth.middleware";

import { ApiError } from "../../utils/exceptions";

import HttpStatusCode from "../../utils/httpstatuscode";

class LoginController implements ControllerInterface {
  path = "/login";
  router = express.Router();
  middleware = AuthMiddleware;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
  }
  public index(request: Request, response: Response) {
    throw new ApiError(
      "This this failed",
      HttpStatusCode.BAD_REQUEST
    );
  }
}
export default LoginController;
