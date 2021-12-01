import { Response } from "express";
import fs from "fs";
import { ApiError, FileHandleError } from "./exceptions";
import HttpStatusCode from "./httpstatuscode";

/**
 * HTTPResponse
 */
class HTTPResponse {
  /**
   * Response as json content type
   * @param response
   * @param data
   * @returns
   */
  static json<T>(response: Response, data: T | object) {
    return response.json(data);
  }

  static async file(response: Response, path: string) {
    if (fs.existsSync(path)) {
      return await response.sendFile(path);
    } else {
      // throw file handle error
      throw new FileHandleError(
        "File doesn't exist",
        HttpStatusCode.NOT_FOUND
      );
    }
  }

  static error(
    response: Response,
    message: string,
    code: number = 404
  ) {
    response.status(code).send(message);
  }
}
export default HTTPResponse;
