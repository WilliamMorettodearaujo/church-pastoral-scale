import { ChurchEntity } from "../entities/churchEntity";
import { CreateChurchInputDTO } from "../services/churchs/dtos/createChurchInputDTO";

export class ChurchMapper {
  static toEntity(dto: CreateChurchInputDTO): ChurchEntity {
    const entity = new ChurchEntity();
    entity.name = dto.name;
    entity.cnpj = dto.cnpj;
    entity.ie = dto.ie;
    return entity;
  }
}
