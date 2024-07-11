import { Request, Response } from "express";
import { ConsultCepServices } from "../../../services/utilitys/consultCep/consultCepServices";

export class ConsultCepController {
  public async handle(req: Request, res: Response) {
    const cep = req.params.cep;
    const service = new ConsultCepServices();
    const output = await service.execute(cep);

    res.json(output);
  }
}
