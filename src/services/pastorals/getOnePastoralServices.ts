import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { ListOutputPastoralDTO } from "./dtos/listOutputPastoralDTO";

export class GetOnePastoralService {
  constructor(readonly pastoralRepository = new PastoralRepositoryTypeOrm()) {}

  public async execute(id: number): Promise<ListOutputPastoralDTO> {
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
