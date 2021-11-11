import { Response } from "express";
import fs from "fs";

export default class JsonResource {
  static json<T>(response: Response, data: T) {
    return response.json(data);
  }

  static async file(response: Response, path: string) {
    console.log("path", path);
    if (fs.existsSync(path)) {
      return await response.sendFile(path);
    } else {
      throw Error("File doesn't exist");
    }
  }
}
