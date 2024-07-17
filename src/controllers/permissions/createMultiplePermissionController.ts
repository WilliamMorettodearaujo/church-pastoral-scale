import { Request, Response } from "express";
import { PermissionRepositoryTypeOrm } from "../../repositories/permissions/permissionRepositoryTypeOrm";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { CreateMultiplePermissionServices } from "../../services/permissions/createMultiplePermissionServices";

export class CreateMultiplePermissionController {
  public async handle(req: Request, res: Response) {
    const permissionRepository = new PermissionRepositoryTypeOrm();
    const resourceRepository = new ResourceRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateMultiplePermissionServices(
      permissionRepository,
      resourceRepository
    );
    const output = await service.execute(payload);

    res.json(output);
  }
}
