import { ResourceEntity } from "../../../entities/resourceEntity";

export interface IResourceRepository {
  save(resource: Partial<ResourceEntity>): Promise<ResourceEntity>;
  getById(id: number): Promise<ResourceEntity | null>;
  getAll(): Promise<ResourceEntity[]>;
  update(
    id: number,
    resource: Partial<ResourceEntity>
  ): Promise<ResourceEntity>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<ResourceEntity>;
}
