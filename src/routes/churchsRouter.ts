import { Request, Response, Router } from "express";
import { CreateChurchController } from "../controllers/churchs/createChurchController";

export const churchRoutes = Router();

churchRoutes.post("/", (req: Request, res: Response) => {
  const controller = new CreateChurchController();
  controller.handle(req, res);
});
