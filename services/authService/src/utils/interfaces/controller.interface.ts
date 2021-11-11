import express, { Request, Response } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export interface IController {
  index?: (req: Request, res: Response) => void;
  update?: () => void;
  destory?: () => void;
  show?: () => void;
}

export interface ControllerInterface extends IController {
  path: string;
  router: express.Router;
  middleware?: CallableFunction;
  intializeRoutes: () => void;
}
