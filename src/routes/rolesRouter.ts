import { Request, Response, Router } from "express";
import { CreateRoleController } from "../controllers/roles/createRoleController";
import { GetOneRoleController } from "../controllers/roles/getOneRoleController";
import { ListRoleController } from "../controllers/roles/listRoleController";
import { UpdateRoleController } from "../controllers/roles/updateRoleController";
import { verifyToken } from "../middleware/authenticationMiddleware";
import { use } from "./middlewares/exeptions";

export const roleRoutes = Router();

roleRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateRoleController();
    return controller.handle(req, res);
  })
);

roleRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOneRoleController();
    return controller.handle(id, res);
  })
);

roleRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const decodeToken = verifyToken(req, res);
    const churchId = decodeToken["churchId"];
    const controller = new ListRoleController();
    return controller.handle(churchId, res);
  })
);

roleRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdateRoleController();
    return controller.handle(id, req, res);
  })
);
