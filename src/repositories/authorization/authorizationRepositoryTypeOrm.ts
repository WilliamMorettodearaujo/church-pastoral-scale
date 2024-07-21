import { AppDataSource } from "../../data-source";
import { ResourceEntity } from "../../entities/resourceEntity";
import { IAuthorizationRepository } from "./IauthorizationRepository";

export default class AuthorizationRepositoryTypeOrm
  implements IAuthorizationRepository
{
  permissionRepository = AppDataSource.getRepository(ResourceEntity);
  async getPermissions(roleId: number) {
    return await this.permissionRepository.query(`
        SELECT s.name as resourceName, p.name as permissionName 
        FROM resources as s, permissions p, role_permissions r
        WHERE (r.role_id=${roleId}) AND (p.id=r.permission_id) and (s.id=p.resource_id);
      `);
  }
}
