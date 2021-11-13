import { Router, Response, Request } from "express";
import { Error as MongooseError } from "mongoose";
import { ControllerInterface } from "../../utils/interfaces/controller.interface";

import { AuthMiddleware } from "../../middlewares/auth.middleware";

import HTTPResponse from "../../utils/response";

import UserService from "../../service/user.service";

class SignupController implements ControllerInterface {
  path = "/signup";
  router = Router();
  middleware = AuthMiddleware;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.middleware, this.index);
    this.router.post(this.path, this.middleware, this.create);
  }
  public async index(request: Request, response: Response) {
    if (request.body) {
      const Forms = request.body;
    }
    const userService = new UserService();
    const users = await userService.Users();
    console.log("users", users);

    HTTPResponse.json<any>(response, { users });
  }

  public async create(request: Request, response: Response) {
    const Forms = request.body;
    const userService = new UserService();

    await userService.SignUp(Forms);
    // .then((users) => {
    //   HTTPResponse.json<any>(response, { users });
    // })
    // .catch((error) => {
    //   if (error instanceof MongooseError.ValidationError) {
    //     HTTPResponse.error(response, error.message);
    //   }
    // });
  }
}
export default SignupController;
