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

// Connect database
Database();

// Create App instance
const app = new App(
  [new LoginController(), new SignupController()],
  Env?.PORT,
  [Compression()]
);

// Listen to Port
if (Env?.APP_DEBUG === "true") app.listen();
else
  multiThreadingCluster(async () => {
    await app.listen();
  }, false);
