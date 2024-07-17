import { Request, Response } from "express";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { UpdatePermissionServices } from "../../services/permissions/updatePermissionServices";

export class UpdatePermissionController {
  public async handle(id: number, req: Request, res: Response) {
    const permissionRepository = new PermissionRepositoryTypeOrm();

    const payload = req.body;
    const service = new UpdatePermissionServices(permissionRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
