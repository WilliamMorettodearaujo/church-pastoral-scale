import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IMassRepository } from "../../repositories/masses/ImassRepository";

import { ListMassOutputDTO } from "./dtos/listMassOutputDTO";

export class ListMassServices {
  constructor(readonly massRepository: IMassRepository) {}

  public async execute(): Promise<ListMassOutputDTO[]> {
    try {
      const masss = await this.massRepository.getAll();
      return masss.map((mass) => ({
        id: mass.id,
        code: mass.code,
        name: mass.name,
        startDateTime: mass.startDateTime,
        observation: mass.observation,
        churchId: mass.church.id,
        churchCorporateName: mass.church.corporateName,
        enabled: mass.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
