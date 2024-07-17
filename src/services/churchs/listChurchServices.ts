import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ListChurchOutputDTO } from "./dtos/listChurchOutputDTO";

export class ListChurchServices {
  constructor(readonly churchRepository: IChurchRepository) {}

  public async execute(): Promise<ListChurchOutputDTO[]> {
    try {
      const churchs = await this.churchRepository.getAll();

      return churchs.map((church) => ({
        id: church.id,
        uuid: church.uuid,
        corporateName: church.corporateName,
        tradingName: church.tradingName,
        federalDocument: church.federalDocument,
        stateDocument: church.stateDocument,
        address: church.address,
        numberAddress: church.numberAddress,
        complement: church.complement,
        district: church.district,
        codepostal: church.codepostal,
        cityId: church.city.id,
        cityName: church.city.name,
        uf: church.city.uf.uf,
        phone: church.phone,
        cell: church.cell,
        email: church.email,
        home: church.home,
        observation: church.observation,
        picture: church.picture,
        enabled: church.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
