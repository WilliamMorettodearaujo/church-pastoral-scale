import { Response } from "express";
import { ConsultCepServices } from "../../../services/utilitys/consultCep/consultCepServices";

export class ConsultCepController {
  public async handle(cep: string, res: Response) {
    const service = new ConsultCepServices();
    const output = await service.execute(cep);

    res.json(output);
  }
}
