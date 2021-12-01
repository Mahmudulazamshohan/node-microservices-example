//Collection of  Http Status Code
import HttpStatusCode from "./httpstatuscode";

export class BaseError extends Error {
  public readonly code: HttpStatusCode;
  public readonly isOperational?: boolean;

  /**
   *  Base Error constructor
   * @param name
   * @param httpCode
   * @param description
   * @param isOperational
   */
  constructor(
    description: string,
    code: HttpStatusCode = 200,
    isOperational?: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code;

    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
/**
 * This error will throw if there any Http related exception error
 */
export class HttpError extends BaseError {}
/**
 * This error will throw if there any Api(application program interface) related exception error
 */
export class ApiError extends BaseError {}
/**
 * This error will throw if there any File system got any related exception error
 */
export class FileHandleError extends BaseError {}
/**
 * This error will throw if there any Database Error got any related exception error
 */
export class DatabaseError extends BaseError {}

export class RabbitMQError extends Error {
  /**
   *  Throw Rabbit MQ Error constructor
   * @param name
   * @param httpCode
   * @param description
   * @param isOperational
   */
  constructor(description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
