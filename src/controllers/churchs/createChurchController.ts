import { Request, Response } from "express";
import { ChurchRepositoryDatabase } from "../../repositories/churchs/churchRepositoryDatabase";
import { CreateChurchServices } from "../../services/churchs/createChurchServices";

export class CreateChurchController {
  public async handle(req: Request, res: Response) {
    const churchRepository = new ChurchRepositoryDatabase();

    const payload = req.body;
    const service = new CreateChurchServices(churchRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
