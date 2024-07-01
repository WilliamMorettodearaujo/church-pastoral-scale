import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IFederalUnitRepository } from "../../repositories/federalUnits/IfederalUnitRepository";
import { ListOutputFederalUnitDTO } from "./dtos/listOutputFederalUnitDTO";

export class ListFederalUnitServices {
  constructor(readonly federalUnitRepository: IFederalUnitRepository) {}

  public async execute(): Promise<ListOutputFederalUnitDTO[]> {
    try {
      const federalUnits = await this.federalUnitRepository.getAll();
      return federalUnits.map((federalUnit) => ({
        uf: federalUnit.uf,
        name: federalUnit.name,
        enabled: federalUnit.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
