import { Response } from "express";
import { FederalUnitRepositoryTypeOrm } from "../../repositories/federalUnits/federalUnitRepositoryTypeOrm";
import { GetOneFederalUnitService } from "../../services/federalUnits/getOneFederalUnitServices";

export class GetOneFederalUnitController {
  public async handle(uf: string, res: Response) {
    const federalUnitRepository = new FederalUnitRepositoryTypeOrm();
    const service = new GetOneFederalUnitService(federalUnitRepository);
    const output = await service.execute(uf);
    res.json(output);
  }
}
