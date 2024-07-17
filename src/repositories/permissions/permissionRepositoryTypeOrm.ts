import { AppDataSource } from "../../data-source";
import { PermissionEntity } from "../../entities/permissionEntity";
import { ResourceEntity } from "../../entities/resourceEntity";
import { IPermissionRepository } from "./IpermissionRepository";

export class PermissionRepositoryTypeOrm implements IPermissionRepository {
  ppermissionRepository = AppDataSource.getRepository(PermissionEntity);
  resourceRepository = AppDataSource.getRepository(ResourceEntity);

  async save(
    ppermission: Partial<PermissionEntity>,
    resource: Partial<ResourceEntity>
  ): Promise<PermissionEntity> {
    const entityPermission = this.ppermissionRepository.create({
      ...ppermission,
      resource: resource,
    });
    return await this.ppermissionRepository.save(entityPermission);
  }

  async getById(id: number): Promise<PermissionEntity> {
    return await this.ppermissionRepository.findOne({
      where: { id: id },
      relations: ["resource"],
    });
  }

  async getAll(): Promise<PermissionEntity[]> {
    return await this.ppermissionRepository.find({
      relations: ["resource"],
    });
  }

  async update(
    id: number,
    ppermission: Partial<PermissionEntity>
  ): Promise<PermissionEntity> {
    const entity = await this.ppermissionRepository.findOne({
      where: { id: id },
      relations: ["resource"],
    });

    this.ppermissionRepository.merge(entity, ppermission);
    return await this.ppermissionRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ppermissionRepository.delete(id);
  }

  async findByNameAndResource(
    name: string,
    resourceId: number
  ): Promise<PermissionEntity | null> {
    return await this.ppermissionRepository.findOne({
      where: {
        name: name,
        resource: { id: resourceId },
      },
    });
  }
  async findByIdAndResourceId(
    id: number,
    resourceId: number
  ): Promise<PermissionEntity | null> {
    return await this.ppermissionRepository.findOne({
      where: {
        id: id,
        resource: { id: resourceId },
      },
      relations: ["resource"],
    });
  }
}
