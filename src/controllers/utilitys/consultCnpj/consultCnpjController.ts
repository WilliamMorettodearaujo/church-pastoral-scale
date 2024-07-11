import { Request, Response } from "express";
import { ConsultCnpjServices } from "../../../services/utilitys/consultCnpj/consultCnpjServices";

export class ConsultCnpjController {
  public async handle(req: Request, res: Response) {
    {
      const cnpj = req.params.cnpj;
      const service = new ConsultCnpjServices();
      const output = await service.execute(cnpj);

      res.json(output);
    }
  }
}
