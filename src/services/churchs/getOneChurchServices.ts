import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ListOutputChurchDTO } from "./dtos/listOutputChurchDTO";

export class GetOneChurchService {
  constructor(readonly churchRepository: IChurchRepository) {}

  public async execute(id: number): Promise<ListOutputChurchDTO> {
    const church = await this.churchRepository.getById(id);
    if (!church) {
      throw new ExceptionHandler("Error", "Church Not Found", 404);
    }
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
    };
  }
}
