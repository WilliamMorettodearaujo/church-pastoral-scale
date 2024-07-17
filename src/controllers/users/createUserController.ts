import { Request, Response } from "express";

import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CommonRepositoryTypeOrm } from "../../repositories/common/commonRepositoryTypeOrm";
import { RoleRepositoryTypeOrm } from "../../repositories/roles/roleRepositoryTypeOrm";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { CreateUserServices } from "../../services/users/createUserServices";

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const commonRepository = new CommonRepositoryTypeOrm();
    const userRepository = new UserRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const roleRepository = new RoleRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateUserServices(
      commonRepository,
      userRepository,
      churchRepository,
      roleRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
