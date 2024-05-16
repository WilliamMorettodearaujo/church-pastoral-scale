import { ChurchMapper } from "../../mappers/churchMapper";
import Registry from "../../registry/Registry";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ChurchValidador } from "../../validator/churchValidador";
import { CreateChurchInputDTO } from "./dtos/createChurchInputDTO";
import { createChurchOutputDTO } from "./dtos/createChurchOutputDTO";

export class CreateChurchServices {
  churchRepository: IChurchRepository;
  constructor(readonly registry: Registry) {
    this.churchRepository = this.registry.inject("IChurchRepository");
  }

  public async execute(
    payload: CreateChurchInputDTO
  ): Promise<createChurchOutputDTO> {
    try {
      ChurchValidador.handle([payload]);

      const documentAlreadyExists = await this.churchRepository.findByDocument(
        payload.cnpj
      );
      if (documentAlreadyExists) {
        throw new Error("Document already exists");
      }

      const churchEntity = ChurchMapper.toEntity(payload);
      const church = await this.churchRepository.save(churchEntity);

      return {
        id: church.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
