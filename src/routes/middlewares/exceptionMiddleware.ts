import { NextFunction, Request, Response } from "express";
import { ExceptionHandler } from "../../exceptions/ExceptionHandler";

export const exceptionMiddleware = (
  error: ExceptionHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.statusCode).json({
    error: error.message,
    details: error.details,
  });
};
