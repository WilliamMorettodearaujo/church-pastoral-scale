import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { IMassRepository } from "../../repositories/masses/ImassRepository";
import { mapScales } from "../../utils/mappers/scaleMapper";

import { ListMassOutputDTO } from "./dtos/listMassOutputDTO";

export class ListMassServices {
  constructor(
    readonly massRepository: IMassRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(churchId: number): Promise<ListMassOutputDTO[]> {
    const church = await this.churchRepository.getById(churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church Not Found", 404);
    }

    try {
      const masses = await this.massRepository.getAll(churchId);

      return masses.map((mass) => ({
        id: mass.id,
        code: mass.code,
        name: mass.name,
        startDateTime: mass.startDateTime,
        observation: mass.observation,
        church: {
          id: mass.church.id,
          corporateName: mass.church.corporateName,
        },
        scale: mass.massScales ? mapScales(mass.massScales) : [],
        enabled: mass.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
