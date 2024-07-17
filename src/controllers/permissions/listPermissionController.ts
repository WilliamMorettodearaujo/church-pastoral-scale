import { Response } from "express";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { ListPermissionServices } from "../../services/permissions/listPermissionServices";

export class ListPermissionController {
  public async handle(res: Response) {
    const permissionRepository = new PermissionRepositoryTypeOrm();

    const service = new ListPermissionServices(permissionRepository);
    const output = await service.execute();
    res.json(output);
  }
}
