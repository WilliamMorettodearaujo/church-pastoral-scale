import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../exceptions/validationException";

export const exceptionMiddleware = (
  error: ValidationException,
  request: Request,
  response: Response,
  next: NextFunction
) => {  
  response.status(error.statusCode).json({
    error: error.message,
    details: error.details,
  });
};
