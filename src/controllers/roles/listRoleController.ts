import { Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { RoleRepositoryTypeOrm } from "../../repositories/roles/roleRepositoryTypeOrm";
import { ListRoleServices } from "../../services/roles/listRoleServices";

export class ListRoleController {
  public async handle(churchId: number, res: Response) {
    const roleRepository = new RoleRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const service = new ListRoleServices(roleRepository, churchRepository);
    const output = await service.execute(churchId);
    res.json(output);
  }
}
