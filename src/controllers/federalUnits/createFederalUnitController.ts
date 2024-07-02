import { Request, Response } from "express";

import { FederalUnitRepositoryTypeOrm } from "../../repositories/federalUnits/federalUnitRepositoryTypeOrm";
import { CreateFederalUnitServices } from "../../services/federalUnits/createFederalUnitServices";

export class CreateFederalUnitController {
  public async handle(req: Request, res: Response) {
    const federalUnitRepository = new FederalUnitRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateFederalUnitServices(federalUnitRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
