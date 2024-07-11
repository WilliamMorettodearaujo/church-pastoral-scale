import { Request, Response } from "express";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { UpdatePastoralServices } from "../../services/pastorals/updatePastoralServices";

export class UpdatePastoralController {
  public async handle(id: number, req: Request, res: Response) {
    const pastoralRepository = new PastoralRepositoryTypeOrm();
    const userRepository = new UserRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdatePastoralServices(
      pastoralRepository,
      userRepository
    );

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
