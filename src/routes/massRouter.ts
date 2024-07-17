import { Request, Response, Router } from "express";
import { CreateMassController } from "../controllers/masses/createMassController";
import { GetOneMassController } from "../controllers/masses/getOneMassController";
import { ListMassController } from "../controllers/masses/listMassController";
import { UpdateMassController } from "../controllers/masses/updateMassController";
import { use } from "./middlewares/exeptions";

export const massRoutes = Router();

massRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateMassController();
    return controller.handle(req, res);
  })
);

massRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOneMassController();
    return controller.handle(id, res);
  })
);

massRoutes.get(
  "/church/:churchId",
  use((req: Request, res: Response) => {
    const churchId = parseInt(req.params.churchId);
    const controller = new ListMassController();
    return controller.handle(churchId, res);
  })
);

massRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdateMassController();
    return controller.handle(id, req, res);
  })
);
