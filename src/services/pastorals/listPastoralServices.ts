import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { ListPastoralOutputDTO } from "./dtos/listPastoralOutputDTO";

export class ListPastoralServices {
  constructor(readonly pastoralRepository: IPastoralRepository) {}

  public async execute(): Promise<ListPastoralOutputDTO[]> {
    try {
      const pastorals = await this.pastoralRepository.getAll();
      return pastorals.map((pastoral) => ({
        id: pastoral.id,
        code: pastoral.code,
        name: pastoral.name,
        observation: pastoral.observation,
        churchId: pastoral.church.id,
        churchName: pastoral.church.corporateName,
        enabled: pastoral.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
