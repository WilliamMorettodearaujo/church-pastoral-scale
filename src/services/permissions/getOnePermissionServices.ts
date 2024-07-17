import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { ListPermissionOutputDTO } from "./dtos/listPermissionOutputDTO";

export class GetOnePermissionService {
  constructor(readonly permissionRepository: IPermissionRepository) {}

  public async execute(id: number): Promise<ListPermissionOutputDTO> {
    const permission = await this.permissionRepository.getById(id);
    if (!permission) {
      throw new ExceptionHandler("Error", "Permission Not Found", 404);
    }

    return {
      id: permission.id,
      uuid: permission.uuid,
      name: permission.name,
      description: permission.description,
      resource: {
        id: permission.resource.id,
        description: permission.resource.description,
        name: permission.resource.name,
      },
      enabled: permission.enabled,
    };
  }
}
