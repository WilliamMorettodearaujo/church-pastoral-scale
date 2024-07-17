import { Response } from "express";
import { ConsultCnpjServices } from "../../../services/utilitys/consultCnpj/consultCnpjServices";

export class ConsultCnpjController {
  public async handle(cnpj: string, res: Response) {
    {
      const service = new ConsultCnpjServices();
      const output = await service.execute(cnpj);

      res.json(output);
    }
  }
}
