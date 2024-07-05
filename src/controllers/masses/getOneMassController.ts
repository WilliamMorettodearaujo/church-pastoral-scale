import { Response } from "express";
import { MassRepositoryTypeOrm } from "../../repositories/masses/massRepositoryTypeOrm";
import { GetOneMassService } from "../../services/masses/getOneMassServices";

export class GetOneMassController {
  public async handle(id: number, res: Response) {
    const massRepository = new MassRepositoryTypeOrm();
    const service = new GetOneMassService(massRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
