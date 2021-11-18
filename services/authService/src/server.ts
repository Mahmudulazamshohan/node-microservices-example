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

// Connect database
Database();

// Create App instance
const app = new App(
  [new LoginController(), new SignupController()],
  Env?.PORT,
  [Compression()]
);
(async () => {
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
      console.log("received data", msg.content);
    },
    MessageQueueType.JSON,
    () => {
      return {
        test: "this is test",
      };
    }
  );

  let count: number = 1;
  const REPLY_QUEUE = "amq.rabbitmq.reply-to";

  let interval = setInterval(async () => {
    await messageQueueProvider.send(
      MQueue.PRODUCT_ORDER,
      { count, name: Math.random() * 1000 },
      {},
      REPLY_QUEUE,
      (msg) => {
        console.log(msg);
      }
    );

    if (count >= 10) clearInterval(interval);

    count++;
  }, 1000);
})();

// Listen to Port
if (Env?.APP_DEBUG === "true") app.listen();
else
  multiThreadingCluster(async () => {
    await app.listen();
  }, false);
