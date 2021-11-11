import { Request, Response, NextFunction } from "express";
import URL from "url";
import { blueCmd, debugPrint, greenUnderlineCmd } from ".";
import winston from "winston";
import path from "path";
import chalk from "chalk";
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../storage/logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../storage/logs", "combined.log"),
    }),
  ],
});

export default (req: Request, res: Response, next: NextFunction) => {
  //console.log('req',req.method)

  debugPrint(
    blueCmd(req.method),
    "-",
    greenUnderlineCmd(
      URL.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: req.originalUrl,
      })
    )
  );
  next();
};
