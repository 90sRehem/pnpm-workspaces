// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import { ApiError } from "../errors/ApiError";
import { errorTypes, errorMap } from "../constants";

export class ErrorHandler {
  public static handleError(
    error: ApiError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    const normalizedError: ApiError = ErrorHandler.normalizeError(error);
    const {
      name, message, fields, statusCode,
    } = normalizedError;
    console.error(
      `Error: ${statusCode}`,
      `Error Name: ${name}`,
      `Error Message: ${message}`,
      "Error Fields:",

      fields || {},
      "Original Error: ",

      error,
    );
    res.status(statusCode).json({ name, message, fields });
    next();
  }

  private static normalizeError(error: ApiError): ApiError {
    const normalizedError: ApiError = new ApiError(error);
    Object.keys(errorMap).forEach((errorKey) => {
      if (errorKey === normalizedError.name) {
        Object.assign(normalizedError, errorMap[errorKey]);
      }
    });
    Object.keys(errorTypes).forEach((errorTypeKey) => {
      const errorType = errorTypes[errorTypeKey];
      if (errorType.statusCode === normalizedError.statusCode) {
        normalizedError.name = errorType.name;
      }
    });
    return normalizedError;
  }
}
