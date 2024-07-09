import { Request, Response } from "express";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { UpdateUserServices } from "../../services/users/updateUserServices";

export class UpdateUserController {
  public async handle(id: number, req: Request, res: Response) {
    const userRepository = new UserRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdateUserServices(userRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
