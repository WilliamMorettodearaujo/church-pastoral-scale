import { Request, Response, Router } from "express";
import { CreateCityController } from "../controllers/cities/createCityController";
import { GetOneCityController } from "../controllers/cities/getOneCityController";
import { ListCityController } from "../controllers/cities/listCityController";
import { UpdateCityController } from "../controllers/cities/updateCityController";
import { use } from "./middlewares/exeptions";

export const cityRoutes = Router();

cityRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateCityController();
    return controller.handle(req, res);
  })
);

cityRoutes.get(
  "/:id",
  use((req: Request, res: Response) => {
    const controller = new GetOneCityController();
    return controller.handle(parseInt(req.params.id), res);
  })
);

cityRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const controller = new ListCityController();
    return controller.handle(res);
  })
);

cityRoutes.patch(
  "/:id",
  use((req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const controller = new UpdateCityController();
    return controller.handle(id, req, res);
  })
);
