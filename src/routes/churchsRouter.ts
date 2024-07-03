import { Request, Response, Router } from "express";
import { CreateChurchController } from "../controllers/churchs/createChurchController";
import { GetOneChurchController } from "../controllers/churchs/getOneChurchController";
import { ListChurchController } from "../controllers/churchs/listChurchController";
import { UpdateChurchController } from "../controllers/churchs/updateChurchController";
import { use } from "./middlewares/exeptions";

export const churchRoutes = Router();

churchRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateChurchController();
    return controller.handle(req, res);
  })
);

churchRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOneChurchController();
    return controller.handle(id, res);
  })
);

churchRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const controller = new ListChurchController();
    return controller.handle(res);
  })
);

churchRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const controller = new UpdateChurchController();
    return controller.handle(parseInt(req.params.id), req, res);
  })
);
