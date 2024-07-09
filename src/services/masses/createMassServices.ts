import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ICommonRepository } from "../../repositories/common/IcommonRepository";
import { IMassRepository } from "../../repositories/masses/ImassRepository";
import { MassValidador } from "../../validator/massValidador";

import { CreateMassInputDTO } from "./dtos/createMassInputDTO";
import { createMassOutputDTO } from "./dtos/createMassOutputDTO";

export class CreateMassServices {
  constructor(
    readonly repository: ICommonRepository,
    readonly massRepository: IMassRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(
    payload: CreateMassInputDTO
  ): Promise<createMassOutputDTO> {
    MassValidador.handle([payload]);

    const church = await this.churchRepository.getById(payload.churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church not found", 404);
    }
    try {
      payload.code = await this.repository.lastCodeByChurch(
        "masses",
        payload.churchId
      );

      delete church.city;

      const mass = await this.massRepository.create(payload, church);

      return {
        id: mass.id,
        code: mass.code,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
