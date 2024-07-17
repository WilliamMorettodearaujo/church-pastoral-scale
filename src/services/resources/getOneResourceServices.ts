import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { ListResourceOutputDTO } from "./dtos/listResourceOutputDTO";

export class GetOneResourceService {
  constructor(readonly resourceRepository: IResourceRepository) {}

  public async execute(id: number): Promise<ListResourceOutputDTO> {
    const resource = await this.resourceRepository.getById(id);
    if (!resource) {
      throw new ExceptionHandler("Error", "Resource Not Found", 404);
    }
    return {
      id: resource.id,
      uuid: resource.uuid,
      name: resource.name,
      description: resource.description,
      enabled: resource.enabled,
    };
  }
}
