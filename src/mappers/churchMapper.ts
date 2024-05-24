import { ChurchEntity } from "../entities/churchEntity";
import { CityEntity } from "../entities/cityEntity";
import { CreateChurchInputDTO } from "../services/churchs/dtos/createChurchInputDTO";

export class ChurchMapper {
  static toEntity(dto: CreateChurchInputDTO): ChurchEntity {
    const entity = new ChurchEntity();
    entity.corporateName = dto.corporateName;
    entity.tradingName = dto.tradingName;
    entity.federalDocument = dto.federalDocument;
    entity.stateDocument = dto.stateDocument;
    entity.address = dto.address;
    entity.numberAddress = dto.numberAddress;
    entity.complement = dto.complement;
    entity.district = dto.district;
    entity.codepostal = dto.codepostal;

    const cityEntity = new CityEntity();
    cityEntity.id = dto.cityId;
    entity.cityId = cityEntity;

    entity.phone = dto.phone;
    entity.cell = dto.cell;
    entity.email = dto.email;
    entity.home = dto.home;
    entity.observation = dto.observation;
    entity.picture = dto.picture;
    entity.enabled = dto.enabled;
    return entity;
  }
}
