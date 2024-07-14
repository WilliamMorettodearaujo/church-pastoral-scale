import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ChurchValidador } from "../../validator/churchValidador";
import { CreateChurchInputDTO } from "./dtos/createChurchInputDTO";
import { createChurchOutputDTO } from "./dtos/createChurchOutputDTO";

export class CreateChurchServices {
  constructor(readonly churchRepository: IChurchRepository) {}

  public async execute(
    payload: CreateChurchInputDTO
  ): Promise<createChurchOutputDTO> {
    ChurchValidador.handle([payload]);

    const documentAlreadyExists =
      await this.churchRepository.findByDocumentFederal(
        payload.federalDocument
      );
    if (documentAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Federal Document ${payload.federalDocument} already exists`,
        409
      );
    }
    try {
      const church = await this.churchRepository.save(payload);

      return {
        id: church.id,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
