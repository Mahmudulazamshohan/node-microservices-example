"use strict";
import exceptionHandler from "./utils/exception-handler";

// packages import
import Database from "./utils/database";

import Compression from "compression";

import { Env } from "./utils/env";

import App from "./app";

import errorMiddleware from "./middlewares/error.middleware";

import { multiThreadingCluster } from "./helpers";

import LoginController from "./controllers/login/login.controller";

import SignupController from "./controllers/signup/signup.controller";

import {
  MessageQueueProvider,
  MessageQueueType,
} from "./utils/message-queue";

import { MQueue } from "./configs/mqueue";
import UserModel from "./models/user/user.model";

// Connect database
Database();

// Create App instance
const app = new App(
  [new LoginController(), new SignupController()],
  Env?.PORT,
  [Compression()]
);
(async () => {
  //
  const messageQueueProvider = new MessageQueueProvider();

  await messageQueueProvider.queueAssert(MQueue.PRODUCT_ORDER);

  type MType = {
    content: {
      c: number;
      name: number;
    };
  };

  messageQueueProvider.on(
    MQueue.PRODUCT_ORDER,
    (msg: MType) => {
      console.log("msg", msg.content);
    },
    MessageQueueType.JSON,
    (msg: MType) => {
      console.log("msg receivd", msg);
      return UserModel.find({});
    }
  );

  let count: number = 1;

  const REPLY_QUEUE = "amq.rabbitmq.reply-to";

  const response = await messageQueueProvider.send(
    MQueue.PRODUCT_ORDER,
    {
      count,
      name: "Shohan",
    },
    {},
    REPLY_QUEUE
    // (msg) => {
    //   console.log("ReplyQueue", JSON.parse(msg));
    // }
  );

  console.log("response", response);
})();

// Listen to Port
if (Env?.APP_DEBUG === "true") app.listen();
else
  multiThreadingCluster(async () => {
    await app.listen();
  }, false);
