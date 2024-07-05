import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IMassRepository } from "../../repositories/masses/ImassRepository";

import { MassValidador } from "../../validator/massValidador";

import { CreateMassInputDTO } from "./dtos/createMassInputDTO";
import { ListMassOutputDTO } from "./dtos/listMassOutputDTO";

export class UpdateMassServices {
  constructor(readonly massRepository: IMassRepository) {}

  public async execute(
    id: number,
    payload: CreateMassInputDTO
  ): Promise<ListMassOutputDTO> {
    MassValidador.handle([payload]);

    const massAlreadyExists = await this.massRepository.getById(id);

    if (!massAlreadyExists) {
      throw new ExceptionHandler("Error", `Mass ${id} Not Found`, 409);
    }

    try {
      const mass = await this.massRepository.update(id, payload);
      return {
        id: mass.id,
        code: mass.code,
        name: mass.name,
        startDateTime: mass.startDateTime,
        observation: mass.observation,
        churchId: mass.church.id,
        churchName: mass.church.corporateName,
        enabled: mass.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
