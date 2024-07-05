import { Request, Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CommonRepositoryTypeOrm } from "../../repositories/common/commonRepositoryTypeOrm";
import { MassRepositoryTypeOrm } from "../../repositories/masses/massRepositoryTypeOrm";
import { CreateMassServices } from "../../services/masses/createMassServices";

export class CreateMassController {
  public async handle(req: Request, res: Response) {
    const payload = req.body;
    const commonRepository = new CommonRepositoryTypeOrm();
    const massRepository = new MassRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();

    const service = new CreateMassServices(
      commonRepository,
      massRepository,
      churchRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
