import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { PermissionValidador } from "../../validator/permissions/permissionResources";
import { CreatePermissionInputDTO } from "./dtos/createPermissionInputDTO";
import { createPermissionOutputDTO } from "./dtos/createPermissionOutputDTO";

export class CreateMultiplePermissionServices {
  constructor(
    readonly permissionRepository: IPermissionRepository,
    readonly resourceRepository: IResourceRepository
  ) {}

  public async execute(
    payload: CreatePermissionInputDTO[]
  ): Promise<createPermissionOutputDTO[]> {
    if (!Array.isArray(payload)) {
      throw new ExceptionHandler(
        "NotArrayError",
        "Payload must be an array",
        400
      );
    }

    const outputs: createPermissionOutputDTO[] = [];

    for (const PermissionResource of payload) {
      PermissionValidador.handle([PermissionResource]);
      const permissionAlreadyExists =
        await this.permissionRepository.findByNameAndResource(
          PermissionResource.name,
          PermissionResource.resourceId
        );

      if (permissionAlreadyExists) {
        throw new ExceptionHandler(
          "ConflictError",
          `Permission Resources ${PermissionResource.name} already exists in the resource ${PermissionResource.resourceId}`,
          409
        );
      }

      const resource = await this.resourceRepository.getById(
        PermissionResource.resourceId
      );

      if (!resource) {
        throw new ExceptionHandler("NotFoundError", "Resource not found", 404);
      }

      try {
        const permission = await this.permissionRepository.save(
          PermissionResource,
          resource
        );

        outputs.push({
          id: permission.id,
        });
      } catch (error) {
        throw new ExceptionHandler("Error", error.message, 500);
      }
    }

    return outputs;
  }
}
