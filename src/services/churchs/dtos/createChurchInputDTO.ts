import { CityEntity } from "../../../entities/cityEntity";

export interface CreateChurchInputDTO {
  corporateName: string;
  tradingName: string;
  federalDocument: string;
  stateDocument: string;
  address: string;
  numberAddress: string;
  complement: string;
  district: string;
  codepostal: string;
  cityId: CityEntity;
  phone: string;
  cell: string;
  email: string;
  home: string;
  observation: string;
  picture: string;
  enabled: boolean;
}
