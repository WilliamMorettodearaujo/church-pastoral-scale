import { Response } from "express";
import { FederalUnitRepositoryTypeOrm } from "../../repositories/federalUnits/federalUnitRepositoryTypeOrm";
import { ListFederalUnitServices } from "../../services/federalUnits/listFederalUnitServices";

export class ListFederalUnitController {
  public async handle(res: Response) {
    const federalUnitRepository = new FederalUnitRepositoryTypeOrm();
    const service = new ListFederalUnitServices(federalUnitRepository);
    const output = await service.execute();
    res.json(output);
  }
}
