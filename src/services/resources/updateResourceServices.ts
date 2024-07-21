import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { ResourceValidador } from "../../validator/permissions/resourceValidador";
import { CreateResourceInputDTO } from "./dtos/createResourceInputDTO";
import { ListResourceOutputDTO } from "./dtos/listResourceOutputDTO";

export class UpdateResourceServices {
  constructor(readonly resourceRepository: IResourceRepository) {}

  public async execute(
    id: number,
    payload: CreateResourceInputDTO
  ): Promise<ListResourceOutputDTO> {
    ResourceValidador.handle([payload]);

    const resourceAlreadyExists = await this.resourceRepository.getById(id);

    if (!resourceAlreadyExists) {
      throw new ExceptionHandler(
        "NotFoundError",
        `Resource ${id} Not Found`,
        404
      );
    }

    const resource = await this.resourceRepository.findByName(payload.name);

    if (resource && resource.id != id) {
      throw new ExceptionHandler(
        "ConflictError",
        `Resource with ${payload.name} already exists`,
        409
      );
    }

    try {
      const resource = await this.resourceRepository.update(id, payload);
      return {
        id: resource.id,
        uuid: resource.uuid,
        name: resource.name,
        description: resource.description,
        enabled: resource.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
