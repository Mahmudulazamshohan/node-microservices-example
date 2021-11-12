"use strict";
// test
// packages import
import Express, { NextFunction, Request, Response } from "express";
import BodyParser from "body-parser";
import Compression from "compression";
import swaggerUi from "swagger-ui-express";

// modules import
import { AuthRouter } from "./routes/index";
import HttpLogger, { logger } from "./helpers/logger.helpers";
import database from "./utils/database";
import { Env } from "./utils/env";

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

database();

function errorHandler(err, req, res, next) {
  console.log("errorHandler", err);

  res.status(err.status || 500).send(err.message);
}
const app = Express();

// Express Plugins
app.use(Compression());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(HttpLogger);
app.use(errorHandler);
// Error handler A: Express Error middleware
app.use(function (err, req, res, next) {
  console.log("**************************");
  console.log("* [Error middleware]: err:", err);
  console.log("**************************");

  next(err);
});

// Error handler B: Node's uncaughtException handler
process.on("uncaughtException", function (err) {
  console.log("**************************");
  console.log("* [process.on(uncaughtException)]: err:", err);
  console.log("**************************");
});

// Router
app.use("/auth", AuthRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  throw new HttpError(
    HttpError.name,
    HttpStatusCode.BAD_GATEWAY,
    "The request failed",
    false
  );
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  debugPrint(redCmd("Exception:"), redBgCmd(err));

  res.status(err.httpCode).json({
    message: err.message,
    errors: err,
  });
});

app.use(
  "/docs/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
//function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {

// cluster cpu processingF
multiThreadingCluster(
  async () =>
    await app.listen(Env?.PORT, () =>
      debugPrint(blueCmd(`PORT - ${Env?.PORT}`))
    ),
  false
);
