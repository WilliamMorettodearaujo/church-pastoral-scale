import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";

import { ChurchValidador } from "../../validator/churchValidador";
import { CreateChurchInputDTO } from "./dtos/createChurchInputDTO";
import { ListOutputChurchDTO } from "./dtos/listOutputChurchDTO";

export class UpdateChurchServices {
  constructor(readonly churchRepository: IChurchRepository) {}

  public async execute(
    id: number,
    payload: CreateChurchInputDTO
  ): Promise<ListOutputChurchDTO> {
    ChurchValidador.handle([payload]);

    const churchAlreadyExists = await this.churchRepository.getById(id);

    if (!churchAlreadyExists) {
      throw new ExceptionHandler("Error", `Church ${id} Not Found`, 409);
    }

    const churchDocumentFederal =
      await this.churchRepository.findByDocumentFederal(
        payload.federalDocument
      );

    if (churchDocumentFederal && churchDocumentFederal.id != id) {
      throw new ExceptionHandler(
        "Error",
        `Church with federal document ${payload.federalDocument} already exists`,
        409
      );
    }

    try {
      const church = await this.churchRepository.update(id, payload);
      return {
        id: church.id,
        corporateName: church.corporateName,
        tradingName: church.tradingName,
        federalDocument: church.federalDocument,
        stateDocument: church.stateDocument,
        address: church.address,
        numberAddress: church.numberAddress,
        complement: church.complement,
        district: church.district,
        codepostal: church.codepostal,
        cityId: church.cityId,
        phone: church.phone,
        cell: church.cell,
        email: church.email,
        home: church.home,
        observation: church.observation,
        picture: church.picture,
        enabled: church.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
