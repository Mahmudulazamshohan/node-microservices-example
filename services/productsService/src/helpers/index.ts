import process from "process";
import { Env } from "../utils/env";
import os from "os";
import cluster from "cluster";
import dotenv, { DotenvParseOptions } from "dotenv";
import chalk from "chalk";
export const debugPrint =
  process.env.NODE_ENV === "development" ? console.log : (): void => {};

interface IUrlFormat {
  host: string;
  port: number | string;
  database: string;
  options: object;
}
/**
 * mongodb uri parse
 * @param uri
 * @returns
 */
export const mongodbURLParse = (uri: IUrlFormat) => {
  return `mongodb://${uri.host}:${uri.port}/${uri.database}`;
};
/**
 * get enviroment value from .env file
 * @param name
 * @param optional
 * @returns
 */
export const env = <G>(name: G | string, optional?: any) => {
  const v: any = dotenv.config().parsed;
  if (name && Env) {
    return v[name];
  } else {
    throw new Error("Env variable not found");
  }
};
/**
 * Multi thread cluster to process multiple worker
 * @param callback
 * @param isLogEnable
 */
export const multiThreadingCluster = (
  callback: Function,
  isLogEnable?: boolean
) => {
  const cpus = os.cpus();
  const numberOfCpus = cpus.length;

  if (cluster.isMaster) {
    // Fork workers.
    Array.from(Array(numberOfCpus)).forEach((cpu) => {
      cluster.fork();
    });

    cluster.on("online", () => {
      isLogEnable && console.log(`Worker in process : ${process.pid}`);
    });

    cluster.on("message", console.log);

    cluster.on("exit", (worker, code, signal) => {
      isLogEnable &&
        console.log(`Process worker ${worker.process.pid} died`, code, signal);
    });
  } else {
    // Child process
    callback();
  }
};
/**
 * Blue color cmd interface
 * @param args
 * @returns
 */
export const blueCmd = (...args: string[]) => {
  return chalk.blue(args);
};
/**
 * Blue color cmd interface
 * @param args
 * @returns
 */
export const yellowCmd = (...args: string[]) => {
  return chalk.yellow(args);
};
/**
 * Green color cmd interface
 * @param args
 * @returns
 */
export const greenUnderlineCmd = (...args: string[]) => {
  return chalk.green.underline(args);
};
/**
 * Red color cmd interface
 * @param args
 * @returns
 */
export const redCmd = (...args: string[]) => {
  return chalk.red(args);
};
/**
 * Reg with bg color cmd interface
 * @param args
 * @returns
 */
export const redBgCmd = (...args: string[]) => {
  return chalk.bgRed(args);
};
