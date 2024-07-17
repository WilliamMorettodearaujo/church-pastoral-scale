import { Request, Response, Router } from "express";
import { ConsultCepController } from "../controllers/utilitys/consultCep/consultCepController";
import { ConsultCnpjController } from "../controllers/utilitys/consultCnpj/consultCnpjController";
import { use } from "./middlewares/exeptions";

export const utilityRouters = Router();

utilityRouters.get(
  "/cep/:cep",
  use((req: Request, res: Response) => {
    const cep = req.params.cep;
    const controller = new ConsultCepController();
    return controller.handle(cep, res);
  })
);

utilityRouters.get(
  "/cnpj/:cnpj",
  use((req: Request, res: Response) => {
    const cnpj = req.params.cnpj;
    const controller = new ConsultCnpjController();
    return controller.handle(cnpj, res);
  })
);
