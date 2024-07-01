import { Request, Response, Router } from "express";
import { CreateFederalUnitController } from "../controllers/federalUnits/createFederalUnitController";
import { GetOneFederalUnitController } from "../controllers/federalUnits/getOneFederalUnitController";
import { ListFederalUnitController } from "../controllers/federalUnits/listFederalUnitController";
import { UpdateFederalUnitController } from "../controllers/federalUnits/updateFederalUnitController";
import { use } from "./middlewares/exeptions";

export const federalUnitRoutes = Router();

federalUnitRoutes.post(
  "/",
  use((req: Request, res: Response) => {
    const controller = new CreateFederalUnitController();
    return controller.handle(req, res);
  })
);

federalUnitRoutes.get(
  "/:uf",
  use((req: Request, res: Response) => {
    const controller = new GetOneFederalUnitController();
    return controller.handle(req.params.uf, res);
  })
);

federalUnitRoutes.get(
  "/",
  use((req: Request, res: Response) => {
    const controller = new ListFederalUnitController();
    return controller.handle(res);
  })
);

federalUnitRoutes.patch(
  "/:uf",
  use((req: Request, res: Response) => {
    const controller = new UpdateFederalUnitController();
    return controller.handle(req.params.uf, req, res);
  })
);
