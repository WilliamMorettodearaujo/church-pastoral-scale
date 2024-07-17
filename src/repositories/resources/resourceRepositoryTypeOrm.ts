import { AppDataSource } from "../../data-source";
import { ResourceEntity } from "../../entities/resourceEntity";
import { IResourceRepository } from "./IresourceRepository";

export class ResourceRepositoryTypeOrm implements IResourceRepository {
  resourceRepository = AppDataSource.getRepository(ResourceEntity);
  async save(resource: Partial<ResourceEntity>): Promise<ResourceEntity> {
    return await this.resourceRepository.save(resource);
  }
  async getById(id: number): Promise<ResourceEntity> {
    return await this.resourceRepository.findOne({ where: { id: id } });
  }
  async getAll(): Promise<ResourceEntity[]> {
    return await this.resourceRepository.find();
  }
  async update(
    id: number,
    resource: Partial<ResourceEntity>
  ): Promise<ResourceEntity> {
    const entity = await this.resourceRepository.findOne({
      where: { id: id },
    });
    this.resourceRepository.merge(entity, resource);
    return await this.resourceRepository.save(entity);
  }
  async delete(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async findByName(name: string): Promise<ResourceEntity> {
    return await this.resourceRepository.findOne({ where: { name: name } });
  }
}
