import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { ListPermissionOutputDTO } from "./dtos/listPermissionOutputDTO";

export class ListPermissionServices {
  constructor(readonly permissionRepository: IPermissionRepository) {}

  public async execute(): Promise<ListPermissionOutputDTO[]> {
    try {
      const permission = await this.permissionRepository.getAll();

      return permission.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        resource: {
          id: permission.resource.id,
          name: permission.resource.name,
          description: permission.resource.description,
        },
        enabled: permission.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
