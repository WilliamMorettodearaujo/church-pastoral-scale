import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { PermissionValidador } from "../../validator/permissions/permissionResources";
import { CreatePermissionInputDTO } from "./dtos/createPermissionInputDTO";
import { createPermissionOutputDTO } from "./dtos/createPermissionOutputDTO";

export class CreatePermissionServices {
  constructor(
    readonly permissionRepository: IPermissionRepository,
    readonly resourceRepository: IResourceRepository
  ) {}

  public async execute(
    payload: CreatePermissionInputDTO
  ): Promise<createPermissionOutputDTO> {
    PermissionValidador.handle([payload]);

    const permissionAlreadyExists =
      await this.permissionRepository.findByNameAndResource(
        payload.name,
        payload.resourceId
      );

    if (permissionAlreadyExists) {
      throw new ExceptionHandler(
        "ConflictError",
        `Permission Resources ${payload.name} already exists in the resource ${payload.resourceId}`,
        409
      );
    }

    const resource = await this.resourceRepository.getById(payload.resourceId);

    if (!resource) {
      throw new ExceptionHandler("NotFoundError", "Resource not found", 404);
    }

    try {
      const permission = await this.permissionRepository.save(
        payload,
        resource
      );

      return {
        id: permission.id,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
