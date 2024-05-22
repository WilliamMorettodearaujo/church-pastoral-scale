import { NextFunction, Request, Response, Router } from "express";
import { CreateChurchController } from "../controllers/churchs/createChurchController";
import { use } from "./middlewares/exeptions";

export const churchRoutes = Router();

churchRoutes.post(
  "/",
  use((req: Request, res: Response, next: NextFunction) => {
    const controller = new CreateChurchController();
    controller.handle(req, res, next);
  })
);
