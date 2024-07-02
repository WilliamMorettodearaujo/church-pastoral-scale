import { Request, Response } from "express";
import { FederalUnitRepositoryTypeOrm } from "../../repositories/federalUnits/federalUnitRepositoryTypeOrm";
import { UpdateFederalUnitServices } from "../../services/federalUnits/updateFederalUnitServices";

export class UpdateFederalUnitController {
  public async handle(uf: string, req: Request, res: Response) {
    const federalUnitRepository = new FederalUnitRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdateFederalUnitServices(federalUnitRepository);

    const output = await service.execute(uf, payload);
    res.json(output);
  }
}
