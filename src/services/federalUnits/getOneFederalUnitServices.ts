import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IFederalUnitRepository } from "../../repositories/federalUnits/IfederalUnitRepository";
import { ListOutputFederalUnitDTO } from "./dtos/listOutputFederalUnitDTO";

export class GetOneFederalUnitService {
  constructor(readonly federalUnitRepository: IFederalUnitRepository) {}

  public async execute(uf: string): Promise<ListOutputFederalUnitDTO> {
    const federalUnit = await this.federalUnitRepository.getById(uf);
    if (!federalUnit) {
      throw new ExceptionHandler("Error", "Federal Unit Not Found", 404);
    }
    return {
      uf: federalUnit.uf,
      name: federalUnit.name,
      enabled: federalUnit.enabled,
    };
  }
}
