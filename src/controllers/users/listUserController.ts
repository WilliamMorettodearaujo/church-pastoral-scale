import { Response } from "express";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { ListUserServices } from "../../services/users/listUserServices";

export class ListUserController {
  public async handle(res: Response) {
    const userRepository = new UserRepositoryTypeOrm();
    const service = new ListUserServices(userRepository);
    const output = await service.execute();
    res.json(output);
  }
}
