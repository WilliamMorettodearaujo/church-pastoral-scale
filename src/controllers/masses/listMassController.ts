import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { MassRepositoryTypeOrm } from "../../repositories/masses/massRepositoryTypeOrm";
import { ListMassServices } from "../../services/masses/listMassServices";

export class ListMassController {
  public async handle(churchId: number, res: Response) {
    const massRepository = new MassRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new ListMassServices(massRepository, churchRepository);
    const output = await service.execute(churchId);
    res.json(output);
  }
}
