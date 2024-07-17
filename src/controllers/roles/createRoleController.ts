import { Request, Response } from "express";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CommonRepositoryTypeOrm } from "../../repositories/common/commonRepositoryTypeOrm";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { RoleRepositoryTypeOrm } from "../../repositories/roles/roleRepositoryTypeOrm";
import { CreateRoleServices } from "../../services/roles/createRoleServices";

export class CreateRoleController {
  public async handle(req: Request, res: Response) {
    const commonRepository = new CommonRepositoryTypeOrm();
    const roleRepository = new RoleRepositoryTypeOrm();
    const churchRepository = new ChurchRepositoryTypeOrm();
    const permissionRepository = new PermissionRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateRoleServices(
      commonRepository,
      roleRepository,
      churchRepository,
      permissionRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
