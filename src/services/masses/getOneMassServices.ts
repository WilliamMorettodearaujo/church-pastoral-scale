import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IMassRepository } from "../../repositories/masses/ImassRepository";
import { mapScales } from "../../utils/mappers/scaleMapper";
import { ListMassOutputDTO } from "./dtos/listMassOutputDTO";

export class GetOneMassService {
  constructor(readonly massRepository: IMassRepository) {}

  public async execute(id: number): Promise<ListMassOutputDTO> {
    const mass = await this.massRepository.getById(id);
    if (!mass) {
      throw new ExceptionHandler("Error", "Mass Not Found", 404);
    }

    return {
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
    };
  }
}
