import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../exceptions/validationException";

export const exceptionMiddleware = (
  error: ValidationException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error) {
    response.status(error.statusCode).json({
      error: "Erro de validação",
      details: error.details,
    });
  }
};
