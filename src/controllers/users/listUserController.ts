import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { ListUserServices } from "../../services/users/listUserServices";

export class ListUserController {
  public async handle(churchId: number, res: Response) {
    const userRepository = new UserRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new ListUserServices(userRepository, churchRepository);

    const output = await service.execute(churchId);
    res.json(output);
  }
}
