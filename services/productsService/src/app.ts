import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import { blueCmd, debugPrint } from "./helpers";
import { Env } from "./utils/env";

class App {
  public app: express.Application;
  public port: number;
  private middlewares: Array<any>;

  constructor(controllers, port, middlewares) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;

    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

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
