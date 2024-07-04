import { Request, Response } from "express";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { UpdatePastoralServices } from "../../services/pastorals/updatePastoralServices";

export class UpdatePastoralController {
  public async handle(id: number, req: Request, res: Response) {
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdatePastoralServices(pastoralRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
