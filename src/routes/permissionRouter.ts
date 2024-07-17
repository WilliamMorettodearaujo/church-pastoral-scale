import { Request, Response, Router } from "express";
import { CreateMultiplePermissionController } from "../controllers/permissions/createMultiplePermissionController";
import { CreatePermissionController } from "../controllers/permissions/createPermissionResourcesController";
import { GetOnePermissionController } from "../controllers/permissions/getOnePermissionController";
import { ListPermissionController } from "../controllers/permissions/listPermissionController";
import { UpdatePermissionController } from "../controllers/permissions/updatePermissionController";
import { use } from "./middlewares/exeptions";

export const permissionRoutes = Router();

permissionRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreatePermissionController();
    return controller.handle(req, res);
  })
);

permissionRoutes.post(
  "/bulk",
  use((req: Request, res: Response) => {
    const controller = new CreateMultiplePermissionController();
    return controller.handle(req, res);
  })
);

permissionRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOnePermissionController();
    return controller.handle(id, res);
  })
);

permissionRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const controller = new ListPermissionController();
    return controller.handle(res);
  })
);

permissionRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdatePermissionController();
    return controller.handle(id, req, res);
  })
);
