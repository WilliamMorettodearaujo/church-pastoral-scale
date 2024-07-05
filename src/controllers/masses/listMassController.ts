import { Response } from "express";
import { MassRepositoryTypeOrm } from "../../repositories/masses/massRepositoryTypeOrm";
import { ListMassServices } from "../../services/masses/listMassServices";

export class ListMassController {
  public async handle(res: Response) {
    const massRepository = new MassRepositoryTypeOrm();
    const service = new ListMassServices(massRepository);
    const output = await service.execute();
    res.json(output);
  }
}
