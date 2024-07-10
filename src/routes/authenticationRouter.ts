import { Request, Response, Router } from "express";
import { ForgotPasswordController } from "../controllers/authentication/forgotPasswordController";
import { LoginController } from "../controllers/authentication/loginController";
import { RefreshTokenController } from "../controllers/authentication/refreshTokenController";
import { ResetPasswordController } from "../controllers/authentication/resetPasswordController";
import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { use } from "./middlewares/exeptions";

export const authenticationRouters = Router();

authenticationRouters.post(
  "/forgot-password",
  use((req: Request, res: Response) => {
    const controller = new ForgotPasswordController();
    return controller.handle(req, res);
  })
);

authenticationRouters.post(
  "/reset-password",
  use((req: Request, res: Response) => {
    const controller = new ResetPasswordController();
    return controller.handle(req, res);
  })
);

authenticationRouters.post(
  "/login",
  use((req: Request, res: Response) => {
    const controller = new LoginController();
    return controller.handle(req, res);
  })
);

authenticationRouters.use(authenticationMiddleware);

authenticationRouters.post(
  "/refresh-token",
  use((req: Request, res: Response) => {
    const controller = new RefreshTokenController();
    return controller.handle(req, res);
  })
);
