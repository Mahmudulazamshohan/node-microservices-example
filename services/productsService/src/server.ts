"use strict";
// packages import
import database from "./utils/database";
import { Env } from "./utils/env";
import App from "./app";
import errorMiddleware from "./middlewares/error.middleware";

import appConfig from "./configs/app";
import swaggerDocument from "./swagger.json";
import {
  redBgCmd,
  blueCmd,
  debugPrint,
  env,
  multiThreadingCluster,
  redCmd,
} from "./helpers";

import { HttpError } from "./utils/exceptions";
import { HttpStatusCode } from "./utils/httpstatuscode";

import PostsController from "./controllers/post.controller";
import LoginController from "./controllers/login.controller";
import JsonResource from "./utils/response";

database();
/**
 *
 *
 *
 **/
function errorHandler(err, req, res, next) {
  console.log("errorHandler", err);
  res.status(err.status || 500).send(err.message);
}

const app = new App(
  [new PostsController(), new LoginController()],
  Env?.PORT,
  [errorMiddleware]
);
multiThreadingCluster(async () => {
  await app.listen();
}, false);
