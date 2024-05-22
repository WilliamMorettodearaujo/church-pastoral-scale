import { Handler, NextFunction, Request, Response } from "express";

/**
 * Resolves errors in routes. This method calls the exception middleware
 */
export const use =
  (fn: Handler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
