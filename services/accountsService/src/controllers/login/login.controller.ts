import { Router, Response, Request } from "express";
import * as express from "express";
import { ControllerInterface } from "../../utils/interfaces/controller.interface";

import { AuthMiddleware } from "../../middlewares/auth.middleware";

import { ApiError } from "../../utils/exceptions";

import HttpStatusCode from "../../utils/httpstatuscode";

import { MessageQueueProvider } from "../../utils/message-queue";

import { MQueue } from "../../configs/mqueue";

import HTTPResponse from "../../utils/response";

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
  public async index(request: Request, response: Response) {
    try {
      const messageQueueProvider = new MessageQueueProvider();

      await messageQueueProvider.queueAssert(MQueue.PRODUCT_ORDER);

      type MType = {
        content: {
          c: number;
          name: number;
        };
      };

      // messageQueueProvider.on(
      //   MQueue.PRODUCT_ORDER,
      //   (msg: MType) => {
      //     console.log("msg", msg.content);
      //   },
      //   MessageQueueType.JSON,
      //   (msg: MType) => {
      //     console.log("msg receivd", msg);
      //     return UserModel.find({});
      //   }
      // );

      let count: number = 1;

      const REPLY_QUEUE = "amq.rabbitmq.reply-to";

      console.time("debug");

      const users = await messageQueueProvider.send(
        MQueue.PRODUCT_ORDER,
        {},
        {},
        REPLY_QUEUE
      );

      HTTPResponse.json<any>(response, { users });

      console.timeEnd("debug");
    } catch (err) {
      console.log(err);
    }
  }
}
export default LoginController;
