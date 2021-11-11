import Bluebird from "bluebird";
import fs from "fs";
import path from "path";

export const FileSystem = Bluebird.promisifyAll(fs);
export const FileDirname = path.join(__dirname, "./storage");
