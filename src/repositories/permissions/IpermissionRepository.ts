import { PermissionEntity } from "../../entities/permissionEntity";
import { ResourceEntity } from "../../entities/resourceEntity";

export interface IPermissionRepository {
  save(
    permission: Partial<PermissionEntity>,
    resource: Partial<ResourceEntity>
  ): Promise<PermissionEntity>;
  getById(id: number): Promise<PermissionEntity | null>;
  getAll(): Promise<PermissionEntity[]>;
  update(
    id: number,
    permission: Partial<PermissionEntity>
  ): Promise<PermissionEntity>;
  delete(id: string): Promise<void>;
  findByNameAndResource(
    name: string,
    resourceId: number
  ): Promise<PermissionEntity | null>;
  findByIdAndResourceId(
    id: number,
    resourceId: number
  ): Promise<PermissionEntity | null>;
}
