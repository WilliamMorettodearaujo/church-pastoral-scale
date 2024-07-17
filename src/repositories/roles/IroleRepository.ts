import { ChurchEntity } from "../../entities/churchEntity";
import { PermissionEntity } from "../../entities/permissionEntity";
import { RoleEntity } from "../../entities/roleEntity";

export interface IRoleRepository {
  save(
    role: Partial<RoleEntity>,
    church: Partial<ChurchEntity>,
    permissions: Partial<PermissionEntity[]>
  ): Promise<RoleEntity>;
  getById(id: number): Promise<RoleEntity | null>;
  getAll(churchId: number): Promise<RoleEntity[]>;
  update(id: number, role: Partial<RoleEntity>): Promise<RoleEntity>;
  delete(id: number): Promise<void>;
  findByNameAndChurch(name: string, churchId: number): Promise<RoleEntity>;
}
