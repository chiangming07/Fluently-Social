import dotenv from "dotenv";
dotenv.config();

import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequestError(message) {
    return new CustomError(message, StatusCodes.BAD_REQUEST);
  }

  static UnauthorizedError(message) {
    return new CustomError(message, StatusCodes.UNAUTHORIZED);
  }

  static ForbiddenError(message) {
    return new CustomError(message, StatusCodes.FORBIDDEN);
  }

  static CONFLICT(message) {
    return new CustomError(message, StatusCodes.FORBIDDEN);
  }

  static NotFoundError(message) {
    return new CustomError(message, StatusCodes.NOT_FOUND);
  }

  static tooManyRequestsError(message) {
    return new CustomError(message, StatusCodes.TOO_MANY_REQUESTS);
  }

  static internalServerError(message) {
    return new CustomError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error",
  };
  if (err instanceof CustomError) {
    customError = err;
  } else {
    // log error
    console.error(err.stack);
  }
  return res.status(customError.statusCode).json({
    message: customError.message,
  });
};

export { CustomError, errorHandler };
