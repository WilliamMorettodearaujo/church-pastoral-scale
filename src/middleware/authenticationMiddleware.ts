import { NextFunction, Request, Response } from "express";
import { ExceptionHandler } from "../exceptions/ExceptionHandler";
import { VerifyTokenLoginProvider } from "../providers/auth/verifyTokenLoginProvider";
import AuthorizationRepositoryTypeOrm from "../repositories/authorization/authorizationRepositoryTypeOrm";
import { AuthorizationServices } from "../services/authorization/authorizationServices";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedToken = await verifyToken(req, res);

  if (!decodedToken)
    return res.status(401).json({
      sucess: false,
      message: "invalid token",
    });

  const roleId = decodedToken["roleId"];

  const authorizationRepository = new AuthorizationRepositoryTypeOrm();

  const service = new AuthorizationServices(authorizationRepository);
  const permissions = await service.execute(roleId);

  if (!permissions) {
    throw new ExceptionHandler("Error", "Unauthorized Access", 404);
  }

  const access = req.baseUrl.split("/").join("");

  const METHODS = {
    GET: {
      permission: "find",
      method: "GET",
    },
    PATCH: {
      permission: "update",
      method: "PATCH",
    },
    POST: {
      permission: "create",
      method: "POST",
    },
  };
  const request = METHODS[req.method];

  let isPermission;
  if (request.method) {
    isPermission = permissions.some(
      (p) =>
        p.resourcename === `${access}` &&
        p.permissionname === request.permission
    );
  }

  if (!isPermission) {
    return res.status(401).json({
      sucess: false,
      message: "Unauthorized Access",
    });
  }

  next();
};

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({
      sucess: false,
      message: "token not provided",
    });

  const verifyToken = new VerifyTokenLoginProvider();
  return await verifyToken.handle(token);
};
