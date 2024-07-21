import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { PermissionValidador } from "../../validator/permissions/permissionResources";
import { CreatePermissionInputDTO } from "./dtos/createPermissionInputDTO";
import { ListPermissionOutputDTO } from "./dtos/listPermissionOutputDTO";

export class UpdatePermissionServices {
  constructor(readonly permissionRepository: IPermissionRepository) {}

  public async execute(
    id: number,
    payload: CreatePermissionInputDTO
  ): Promise<ListPermissionOutputDTO> {
    PermissionValidador.handle([payload]);

    const permissionAlreadyExists =
      await this.permissionRepository.findByIdAndResourceId(
        id,
        payload.resourceId
      );

    if (!permissionAlreadyExists) {
      throw new ExceptionHandler(
        "NotFoundError",
        `Permission Resources ${id} Not Found`,
        404
      );
    }

    const permissionAndChurch =
      await this.permissionRepository.findByNameAndResource(
        payload.name,
        payload.resourceId
      );

    if (permissionAndChurch && permissionAndChurch.id != id) {
      throw new ExceptionHandler(
        "ConflictError",
        `Permission ${payload.name} already exists to for ${payload.resourceId}`,
        409
      );
    }

    try {
      const permission = await this.permissionRepository.update(id, payload);
      return {
        id: permission.id,
        uuid: permission.uuid,
        name: permission.name,
        description: permission.description,
        resource: {
          id: permission.resource.id,
          name: permission.resource.name,
          description: permission.resource.description,
        },
        enabled: permission.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
