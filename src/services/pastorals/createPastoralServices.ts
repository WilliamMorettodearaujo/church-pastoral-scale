import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ICommonRepository } from "../../repositories/common/IcommonRepository";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { PastoralValidador } from "../../validator/pastoralValidador";
import { CreatePastoralInputDTO } from "./dtos/createPastoralInputDTO";
import { createPastoralOutputDTO } from "./dtos/createPastoralOutputDTO";

export class CreatePastoralServices {
  constructor(
    readonly commonRepository: ICommonRepository,
    readonly pastoralRepository: IPastoralRepository,
    readonly churchRepository: IChurchRepository,
    readonly userRepository: IUserRepository
  ) {}

  public async execute(
    payload: CreatePastoralInputDTO
  ): Promise<createPastoralOutputDTO> {
    PastoralValidador.handle([payload]);

    const pastoralAlreadyExists =
      await this.pastoralRepository.findByNameAndChurch(
        payload.name,
        payload.churchId
      );

    if (pastoralAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Pastoral ${payload.name} already exists`,
        409
      );
    }

    const church = await this.churchRepository.getById(payload.churchId);

    const userIds = await this.userRepository.findByIds(payload.userIds);

    if (!church) {
      throw new ExceptionHandler("Error", "Church not found", 404);
    }

    try {
      payload.code = await this.commonRepository.lastCodeByChurch(
        "pastorals",
        payload.churchId
      );

      delete church.city;
      const pastoral = await this.pastoralRepository.create(
        payload,
        church,
        userIds
      );

      return {
        id: pastoral.id,
        code: pastoral.code,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
