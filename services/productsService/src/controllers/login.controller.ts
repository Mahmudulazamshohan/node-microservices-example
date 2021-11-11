import { Router, Response, Request } from "express";
import * as express from "express";
import { ControllerInterface } from "../utils/interfaces/controller.interface";

class LoginController implements ControllerInterface {
  path = "/login";
  router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
  }
  public index(req: Request, res: Response) {}
}
export default LoginController;
