import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { ListChurchServices } from "../../services/churchs/listChurchServices";

export class ListChurchController {
  public async handle(res: Response) {
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new ListChurchServices(churchRepository);
    const output = await service.execute();
    res.json(output);
  }
}
