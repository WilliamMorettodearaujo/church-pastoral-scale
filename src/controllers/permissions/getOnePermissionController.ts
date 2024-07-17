import { Response } from "express";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { GetOnePermissionService } from "../../services/permissions/getOnePermissionServices";

export class GetOnePermissionController {
  public async handle(id: number, res: Response) {
    const permissionRepository = new PermissionRepositoryTypeOrm();
    const service = new GetOnePermissionService(permissionRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
