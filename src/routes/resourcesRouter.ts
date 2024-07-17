import { Request, Response, Router } from "express";
import { CreateResourceController } from "../controllers/resources/createResourceController";
import { GetOneResourceController } from "../controllers/resources/getOneResourceController";
import { ListResourceController } from "../controllers/resources/listResourceController";
import { UpdateResourceController } from "../controllers/resources/updateResourceController";
import { use } from "./middlewares/exeptions";

export const resourceRoutes = Router();

resourceRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateResourceController();
    return controller.handle(req, res);
  })
);

resourceRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOneResourceController();
    return controller.handle(id, res);
  })
);

resourceRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const controller = new ListResourceController();
    return controller.handle(res);
  })
);

resourceRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdateResourceController();
    return controller.handle(id, req, res);
  })
);
