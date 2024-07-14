import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IFederalUnitRepository } from "../../repositories/federalUnits/IfederalUnitRepository";
import { FederalUnitValidador } from "../../validator/federalUnitValidador";
import { CreateFederalUnitInputDTO } from "./dtos/createFederalUnitInputDTO";
import { createFederalUnitOutputDTO } from "./dtos/createFederalUnitOutputDTO";

export class CreateFederalUnitServices {
  constructor(readonly federalUnitRepository: IFederalUnitRepository) {}

  public async execute(
    payload: CreateFederalUnitInputDTO
  ): Promise<createFederalUnitOutputDTO> {
    FederalUnitValidador.handle([payload]);

    const ufAlreadyExists = await this.federalUnitRepository.getById(
      payload.uf
    );

    if (ufAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Federal Document ${payload.uf} already exists`,
        409
      );
    }

    try {
      const federalUnit = await this.federalUnitRepository.save(payload);

      return {
        uf: federalUnit.uf,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error, 500);
    }
  }
}
