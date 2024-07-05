import { Request, Response } from "express";
import { MassRepositoryTypeOrm } from "../../repositories/masses/massRepositoryTypeOrm";
import { UpdateMassServices } from "../../services/masses/updateMassServices";

export class UpdateMassController {
  public async handle(id: number, req: Request, res: Response) {
    const massRepository = new MassRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdateMassServices(massRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
