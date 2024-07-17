import { Response } from "express";
import { RoleRepositoryTypeOrm } from "../../repositories/roles/roleRepositoryTypeOrm";
import { GetOneRoleService } from "../../services/roles/getOneRoleServices";

export class GetOneRoleController {
  public async handle(id: number, res: Response) {
    const roleRepository = new RoleRepositoryTypeOrm();
    const service = new GetOneRoleService(roleRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
