import { Response } from "express";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { GetOneUserService } from "../../services/users/getOneUserServices";

export class GetOneUserController {
  public async handle(id: number, res: Response) {
    const userRepository = new UserRepositoryTypeOrm();
    const service = new GetOneUserService(userRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
