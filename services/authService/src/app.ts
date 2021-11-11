import bodyParser from "body-parser";
import compression from "compression";
import express, { NextFunction } from "express";
import { blueCmd, debugPrint, redBgCmd } from "./helpers";

import { ControllerInterface } from "./utils/interfaces/controller.interface";

import { LogsDirname } from "./utils/filesystem";
import { createLogger, transports } from "winston";
import { ApiError } from "./utils/exceptions";

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: LogsDirname("./app_error.log") }),
  ],
});

class ErrorLogger {
  constructor() {}
  async logError(err) {
    console.log(
      "==================== Start Error Logger ==============="
    );
    LogErrors.log({
      private: true,
      level: "error",
      message: `${new Date()}-${JSON.stringify(err)}`,
    });
    console.log(
      "==================== End Error Logger ==============="
    );
    // log error with Logger plugins

    return false;
  }

  isTrustError(error) {
    if (error instanceof ApiError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const errorMiddleware = (req, res, next) => {
  // const err = { statusCode: 200, errorStack: null, message: "" };
  const errorLogger = new ErrorLogger();

  console.log("<==========Started=========>");
  process.on("unhandledRejection", (reason, promise) => {
    next(reason);
    // need to take care
  });

  next();
  // process.on("uncaughtException", (error) => {
  //   console.log("logError", error);
  //   errorLogger.logError(error);
  //   if (errorLogger.isTrustError(error)) {
  //     //process exist // need restart
  //   }
  // });

  // console.log(err.description, '-------> DESCRIPTION')
  // console.log(err.message, '-------> MESSAGE')
  // console.log(err.name, '-------> NAME')
  // if (err) {
  //   errorLogger.logError(err);
  //   if (errorLogger.isTrustError(err)) {
  //     if (err.errorStack) {
  //       const errorDescription = err.errorStack;
  //       return res
  //         .status(err.statusCode)
  //         .json({ message: errorDescription });
  //     }
  //     return res
  //       .status(err.statusCode)
  //       .json({ message: err.message });
  //   } else {
  //     //process exit // terriablly wrong with flow need restart
  //   }
  //   return res.status(err.statusCode).json({ message: err.message });
  // }
};
class App {
  public app: express.Application;
  public port: number;
  private middlewares: Array<any>;

  constructor(
    controllers: Array<ControllerInterface>,
    port,
    middlewares: Array<any>
  ) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;

    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(errorMiddleware);
    //init controllers and middleware
    this.initializeMiddlewares();

    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening PORT - ${this.port}`);
      debugPrint(blueCmd(`App Listening PORT - ${this.port}`));
    });
  }
}
export default App;
