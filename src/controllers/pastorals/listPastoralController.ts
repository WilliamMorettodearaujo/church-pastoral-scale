import { Response } from "express";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { ListPastoralServices } from "../../services/pastorals/listPastoralServices";

export class ListPastoralController {
  public async handle(res: Response) {
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const service = new ListPastoralServices(pastoralRepository);
    const output = await service.execute();
    res.json(output);
  }
}
