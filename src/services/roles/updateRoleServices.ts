import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IRoleRepository } from "../../repositories/roles/IroleRepository";
import { mapPermissions } from "../../utils/mappers/permissionMapper";
import { RoleValidador } from "../../validator/permissions/roleValidador";
import { CreateRoleInputDTO } from "./dtos/createRoleInputDTO";
import { ListRoleOutputDTO } from "./dtos/listRoleOutputDTO";

export class UpdateRoleServices {
  constructor(readonly roleRepository: IRoleRepository) {}

  public async execute(
    id: number,
    payload: CreateRoleInputDTO
  ): Promise<ListRoleOutputDTO> {
    RoleValidador.handle([payload]);

    const roleAlreadyExists = await this.roleRepository.getById(id);

    if (!roleAlreadyExists) {
      throw new ExceptionHandler("Error", `Role ${id} Not Found`, 404);
    }

    const roleAndChurch = await this.roleRepository.findByNameAndChurch(
      payload.name,
      payload.churchId
    );

    if (roleAndChurch && roleAndChurch.id != id) {
      throw new ExceptionHandler(
        "Error",
        `Role ${payload.name} already exists to for ${payload.churchId}`,
        409
      );
    }

    try {
      const role = await this.roleRepository.update(id, payload);

      return {
        id: role.id,
        uuid: role.uuid,
        code: role.code,
        name: role.name,
        description: role.description,
        permissions: role.permissions ? mapPermissions(role.permissions) : [],
        enabled: role.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
