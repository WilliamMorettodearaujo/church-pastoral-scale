import { ValidationException } from "../../exceptions/validationException";
import { ChurchMapper } from "../../mappers/churchMapper";
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

    const documentAlreadyExists = await this.churchRepository.findByDocument(
      payload.federalDocument
    );
    if (documentAlreadyExists) {
      throw new ValidationException(
        "Schema inválido",
        `Federal Document ${payload.federalDocument} already exists`,
        400
      );
    }

    const churchEntity = ChurchMapper.toEntity(payload);
    const church = await this.churchRepository.create(churchEntity);

    return {
      id: church.id,
    };
  }
}
