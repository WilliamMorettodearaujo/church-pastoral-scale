import { Request, Response, Router } from "express";
import { CreateChurchController } from "../controllers/churchs/createChurchController";
import { use } from "./middlewares/exeptions";

export const churchRoutes = Router();

churchRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateChurchController();
    return controller.handle(req, res);
  })
);
