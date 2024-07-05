import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { GetOneChurchService } from "../../services/churchs/getOneChurchServices";

export class GetOneChurchController {
  public async handle(id: number, res: Response) {
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new GetOneChurchService(churchRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
