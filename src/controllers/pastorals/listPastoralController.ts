import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { ListPastoralServices } from "../../services/pastorals/listPastoralServices";

export class ListPastoralController {
  public async handle(churchId: number, res: Response) {
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new ListPastoralServices(
      pastoralRepository,
      churchRepository
    );
    const output = await service.execute(churchId);
    res.json(output);
  }
}
