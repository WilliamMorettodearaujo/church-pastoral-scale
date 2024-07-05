import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IFederalUnitRepository } from "../../repositories/federalUnits/IfederalUnitRepository";
import { ListFederalUnitOutputDTO } from "./dtos/listFederalUnitOutputDTO";

export class ListFederalUnitServices {
  constructor(readonly federalUnitRepository: IFederalUnitRepository) {}

  public async execute(): Promise<ListFederalUnitOutputDTO[]> {
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
