import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { IRoleRepository } from "../../repositories/roles/IroleRepository";
import { mapPermissions } from "../../utils/mappers/permissionMapper";
import { ListRoleOutputDTO } from "./dtos/listRoleOutputDTO";

export class ListRoleServices {
  constructor(
    readonly roleRepository: IRoleRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(churchId: number): Promise<ListRoleOutputDTO[]> {
    const church = await this.churchRepository.getById(churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church Not Found", 404);
    }

    try {
      const roles = await this.roleRepository.getAll(churchId);

      return roles.map((role) => ({
        id: role.id,
        code: role.code,
        name: role.name,
        description: role.description,
        permissions: role.permissions ? mapPermissions(role.permissions) : [],
        enabled: role.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
