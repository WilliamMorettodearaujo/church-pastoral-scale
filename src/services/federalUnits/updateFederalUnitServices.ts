import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IFederalUnitRepository } from "../../repositories/federalUnits/IfederalUnitRepository";
import { FederalUnitValidador } from "../../validator/federalUnitValidador";
import { CreateFederalUnitInputDTO } from "./dtos/createFederalUnitInputDTO";
import { ListOutputFederalUnitDTO } from "./dtos/listOutputFederalUnitDTO";

export class UpdateFederalUnitServices {
  constructor(readonly federalUnitRepository: IFederalUnitRepository) {}

  public async execute(
    uf: string,
    payload: CreateFederalUnitInputDTO
  ): Promise<ListOutputFederalUnitDTO> {
    FederalUnitValidador.handle([payload]);

    const federalUnitAlreadyExists =
      await this.federalUnitRepository.getById(uf);

    if (!federalUnitAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Federal Document ${uf} Not Found`,
        409
      );
    }

    if (federalUnitAlreadyExists.uf !== payload.uf) {
      throw new ExceptionHandler(
        "Error",
        `Federal Document ${payload.uf} already exists`,
        409
      );
    }

    try {
      const federalUnit = await this.federalUnitRepository.update(uf, payload);
      return {
        uf: federalUnit.uf,
        name: federalUnit.name,
        enabled: federalUnit.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
