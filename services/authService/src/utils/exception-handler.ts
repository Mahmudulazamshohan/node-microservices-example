import { Response } from "express";
import { debugPrint, redBgCmd } from "../helpers";

export default (): void => {
  process.on("uncaughtException", (err: any) => {
    debugPrint(redBgCmd("UncaughtException ") + err.message);
  });

  process.on("unhandledRejection", (err: any) => {
    debugPrint(redBgCmd("UnhandledRejection "));
    debugPrint(err);
  });
};
