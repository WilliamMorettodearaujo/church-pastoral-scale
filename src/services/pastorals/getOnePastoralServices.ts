import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { ListPastoralOutputDTO } from "./dtos/listPastoralOutputDTO";

export class GetOnePastoralService {
  constructor(readonly pastoralRepository: IPastoralRepository) {}

  public async execute(id: number): Promise<ListPastoralOutputDTO> {
    const pastoral = await this.pastoralRepository.getById(id);
    if (!pastoral) {
      throw new ExceptionHandler("Error", "Pastoral Not Found", 404);
    }
    return {
      id: pastoral.id,
      code: pastoral.code,
      name: pastoral.name,
      observation: pastoral.observation,
      churchId: pastoral.church.id,
      churchName: pastoral.church.corporateName,
      enabled: pastoral.enabled,
    };
  }
}
