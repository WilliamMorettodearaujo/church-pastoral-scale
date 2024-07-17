import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { ListResourceOutputDTO } from "./dtos/listResourceOutputDTO";

export class ListResourceServices {
  constructor(readonly resourceRepository: IResourceRepository) {}

  public async execute(): Promise<ListResourceOutputDTO[]> {
    try {
      const resources = await this.resourceRepository.getAll();

      return resources.map((resource) => ({
        id: resource.id,
        name: resource.name,
        description: resource.description,
        enabled: resource.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
