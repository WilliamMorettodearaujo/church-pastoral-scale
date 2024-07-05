import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IMassRepository } from "../../repositories/masses/ImassRepository";
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
      starDateTime: mass.starDateTime,
      observation: mass.observation,
      churchId: mass.church.id,
      churchName: mass.church.corporateName,
      enabled: mass.enabled,
    };
  }
}
