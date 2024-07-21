import { Request, Response, Router } from "express";
import { CreateUserController } from "../controllers/users/createUserController";
import { GetOneUserController } from "../controllers/users/getOneUserController";
import { ListUserController } from "../controllers/users/listUserController";
import { UpdateUserController } from "../controllers/users/updateUserController";
import { verifyToken } from "../middleware/authenticationMiddleware";
import { use } from "./middlewares/exeptions";

export const userRoutes = Router();

userRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateUserController();
    return controller.handle(req, res);
  })
);

userRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new GetOneUserController();
    return controller.handle(id, res);
  })
);

userRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const decodeToken = verifyToken(req, res);
    const churchId = decodeToken["churchId"];
    const controller = new ListUserController();
    return controller.handle(churchId, res);
  })
);

userRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const controller = new UpdateUserController();
    return controller.handle(id, req, res);
  })
);
