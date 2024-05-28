import { Request, Response } from "express";

import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CreateChurchServices } from "../../services/churchs/createChurchServices";

export class CreateChurchController {
  public async handle(req: Request, res: Response) {
    const churchRepository = new ChurchRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateChurchServices(churchRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
