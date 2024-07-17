import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IRoleRepository } from "../../repositories/roles/IroleRepository";
import { mapPermissions } from "../../utils/mappers/permissionMapper";
import { ListRoleOutputDTO } from "./dtos/listRoleOutputDTO";

export class GetOneRoleService {
  constructor(readonly roleRepository: IRoleRepository) {}

  public async execute(id: number): Promise<ListRoleOutputDTO> {
    const role = await this.roleRepository.getById(id);
    if (!role) {
      throw new ExceptionHandler("Error", "Role Not Found", 404);
    }

    return {
      id: role.id,
      uuid: role.uuid,
      code: role.code,
      name: role.name,
      description: role.description,
      permissions: role.permissions ? mapPermissions(role.permissions) : [],
      enabled: role.enabled,
    };
  }
}
