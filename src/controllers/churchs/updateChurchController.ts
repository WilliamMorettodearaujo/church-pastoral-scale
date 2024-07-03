import { Request, Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { UpdateChurchServices } from "../../services/churchs/updateChurchServices";

export class UpdateChurchController {
  public async handle(id: number, req: Request, res: Response) {
    const churchRepository = new ChurchRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdateChurchServices(churchRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
