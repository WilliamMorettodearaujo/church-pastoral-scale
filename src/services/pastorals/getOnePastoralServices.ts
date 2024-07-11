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

    const users = pastoral.users.map((user) => {
      return {
        id: user.id,
        code: user.code,
        name: user.name,
        email: user.email,
        enabled: user.enabled,
      };
    });

    return {
      id: pastoral.id,
      code: pastoral.code,
      name: pastoral.name,
      observation: pastoral.observation,
      church: {
        id: pastoral.church.id,
        corporateName: pastoral.church.corporateName,
      },
      enabled: pastoral.enabled,
      users: users,
    };
  }
}
