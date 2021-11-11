import Bluebird from "bluebird";
import fs from "fs";
import path from "path";

export const FileSystem = Bluebird.promisifyAll(fs);

export const FileDirname: string = path.join(__dirname, "./storage");

export const LogsDirname = (prefix: string) =>
  path.join(FileDirname, "./logs", prefix);
