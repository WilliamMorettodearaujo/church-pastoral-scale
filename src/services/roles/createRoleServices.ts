import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ICommonRepository } from "../../repositories/common/IcommonRepository";
import { IPermissionRepository } from "../../repositories/permissions/IpermissionRepository";
import { IRoleRepository } from "../../repositories/roles/IroleRepository";
import { RoleValidador } from "../../validator/permissions/roleValidador";
import { CreateRoleInputDTO } from "./dtos/createRoleInputDTO";
import { createRoleOutputDTO } from "./dtos/createRoleOutputDTO";

export class CreateRoleServices {
  constructor(
    readonly commonRepository: ICommonRepository,
    readonly roleRepository: IRoleRepository,
    readonly churchRepository: IChurchRepository,
    readonly permissionRepository: IPermissionRepository
  ) {}

  public async execute(
    payload: CreateRoleInputDTO
  ): Promise<createRoleOutputDTO> {
    RoleValidador.handle([payload]);

    const roleAlreadyExists = await this.roleRepository.findByNameAndChurch(
      payload.name,
      payload.churchId
    );

    if (roleAlreadyExists) {
      throw new ExceptionHandler(
        "ConflictError",
        `Role ${payload.name} already exists`,
        409
      );
    }

    const permissions = [];
    if (payload.permissionIds) {
      const permissionIds = payload.permissionIds;

      for (const permissionsId of permissionIds) {
        const permission =
          await this.permissionRepository.getById(permissionsId);
        if (permission) {
          permissions.push(permission);
        } else {
          throw new ExceptionHandler(
            "NotFoundError",
            `User id ${permissionsId} not found`,
            404
          );
        }
      }
    }
    const church = await this.churchRepository.getById(payload.churchId);

    if (!church) {
      throw new ExceptionHandler("NotFoundError", "Church not found", 404);
    }

    try {
      payload.code = await this.commonRepository.lastCodeByChurch(
        "roles",
        payload.churchId
      );

      delete church.city;
      const role = await this.roleRepository.save(payload, church, permissions);

      return {
        id: role.id,
        code: role.code,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
