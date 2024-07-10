import { NextFunction, Request, Response } from "express";
import { VerifyTokenLoginProvider } from "../providers/auth/verifyTokenLoginProvider";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  try {
    if (!token)
      return res.status(401).json({
        sucess: false,
        message: "token não informado",
      });

    const verifyToken = new VerifyTokenLoginProvider();
    if (!(await verifyToken.handle(token)))
      return res.status(401).json({
        sucess: false,
        message: "token invalido",
      });

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
};
