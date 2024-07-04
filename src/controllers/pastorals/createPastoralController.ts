import { Request, Response } from "express";

import { CreatePastoralServices } from "../../services/pastorals/createPastoralServices";

export class CreatePastoralController {
  public async handle(req: Request, res: Response) {
    const payload = req.body;
    const service = new CreatePastoralServices();
    const output = await service.execute(payload);

    res.json(output);
  }
}
