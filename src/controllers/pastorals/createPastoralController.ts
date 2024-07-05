import { Request, Response } from "express";

import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CommonRepositoryTypeOrm } from "../../repositories/common/commonRepositoryTypeOrm";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { CreatePastoralServices } from "../../services/pastorals/createPastoralServices";

export class CreatePastoralController {
  public async handle(req: Request, res: Response) {
    const commonRepository = new CommonRepositoryTypeOrm();
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreatePastoralServices(
      commonRepository,
      pastoralRepository,
      churchRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
