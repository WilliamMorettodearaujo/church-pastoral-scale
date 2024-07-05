import { Response } from "express";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { GetOnePastoralService } from "../../services/pastorals/getOnePastoralServices";

export class GetOnePastoralController {
  public async handle(id: number, res: Response) {
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const service = new GetOnePastoralService(pastoralRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
