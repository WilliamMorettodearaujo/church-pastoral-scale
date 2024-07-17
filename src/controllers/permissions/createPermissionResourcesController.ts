import { Request, Response } from "express";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { CreatePermissionServices } from "../../services/permissions/createPermissionServices";

export class CreatePermissionController {
  public async handle(req: Request, res: Response) {
    const permissionRepository = new PermissionRepositoryTypeOrm();
    const resourceRepository = new ResourceRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreatePermissionServices(
      permissionRepository,
      resourceRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
