import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { PermissionEntity } from "../../entities/permissionEntity";
import { RoleEntity } from "../../entities/roleEntity";
import { IRoleRepository } from "./IroleRepository";

export class RoleRepositoryTypeOrm implements IRoleRepository {
  roleRepository = AppDataSource.getRepository(RoleEntity);
  async save(
    role: Partial<RoleEntity>,
    church: Partial<ChurchEntity>,
    permissions: Partial<PermissionEntity[]>
  ): Promise<RoleEntity> {
    const entityRole = this.roleRepository.create({
      ...role,
      church: church,
      permissions: permissions,
    });
    return await this.roleRepository.save(entityRole);
  }
  async getById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: { id: id },
    });
  }
  async getAll(churchId: number): Promise<RoleEntity[]> {
    return await this.roleRepository.find({
      where: { church: { id: churchId } },
    });
  }
  async update(id: number, role: Partial<RoleEntity>): Promise<RoleEntity> {
    const entity = await this.roleRepository.findOne({
      where: { id: id },
    });
    this.roleRepository.merge(entity, role);
    return await this.roleRepository.save(entity);
  }
  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async findByNameAndChurch(
    name: string,
    churchId: number
  ): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: {
        name: name,
        church: { id: churchId },
      },
    });
  }
}
