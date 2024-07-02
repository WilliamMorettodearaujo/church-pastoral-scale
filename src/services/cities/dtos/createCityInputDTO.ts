import { FederalUnitEntity } from "../../../entities/federalUnitEntity";

export interface CreateCityInputDTO {
  name: string;
  uf: FederalUnitEntity;
}
