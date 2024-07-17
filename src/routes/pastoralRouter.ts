import { Request, Response, Router } from "express";
import { CreatePastoralController } from "../controllers/pastorals/createPastoralController";
import { GetOnePastoralController } from "../controllers/pastorals/getOnePastoralController";
import { ListPastoralController } from "../controllers/pastorals/listPastoralController";
import { UpdatePastoralController } from "../controllers/pastorals/updatePastoralController";
import { use } from "./middlewares/exeptions";

export const pastoralRoutes = Router();

pastoralRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreatePastoralController();
    return controller.handle(req, res);
  })
);

pastoralRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOnePastoralController();
    return controller.handle(id, res);
  })
);

pastoralRoutes.get(
  "/church/:churchId",
  use((req: Request, res: Response) => {
    const churchId = parseInt(req.params.churchId);
    const controller = new ListPastoralController();
    return controller.handle(churchId, res);
  })
);

pastoralRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdatePastoralController();
    return controller.handle(id, req, res);
  })
);
