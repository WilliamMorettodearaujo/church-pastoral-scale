import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IResourceRepository } from "../../repositories/resources/IresourceRepository";
import { ResourceValidador } from "../../validator/permissions/resourceValidador";
import { CreateResourceInputDTO } from "./dtos/createResourceInputDTO";
import { createResourceOutputDTO } from "./dtos/createResourceOutputDTO";

export class CreateResourceServices {
  constructor(readonly resourceRepository: IResourceRepository) {}

  public async execute(
    payload: CreateResourceInputDTO
  ): Promise<createResourceOutputDTO> {
    ResourceValidador.handle([payload]);

    const nameAlreadyExists = await this.resourceRepository.findByName(
      payload.name
    );
    if (nameAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Resource ${payload.name} already exists`,
        409
      );
    }
    try {
      const resource = await this.resourceRepository.save(payload);

      return {
        id: resource.id,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
