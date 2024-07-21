import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { mapUsers } from "../../utils/mappers/userMapper";
import { PastoralValidador } from "../../validator/pastoralValidador";

import { CreatePastoralInputDTO } from "./dtos/createPastoralInputDTO";
import { ListPastoralOutputDTO } from "./dtos/listPastoralOutputDTO";

export class UpdatePastoralServices {
  constructor(
    readonly pastoralRepository: IPastoralRepository,
    readonly userRepository: IUserRepository
  ) {}

  public async execute(
    id: number,
    payload: CreatePastoralInputDTO
  ): Promise<ListPastoralOutputDTO> {
    PastoralValidador.handle([payload]);

    const pastoralAlreadyExists = await this.pastoralRepository.getById(id);

    if (!pastoralAlreadyExists) {
      throw new ExceptionHandler(
        "NotFoundError",
        `Pastoral ${id} Not Found`,
        404
      );
    }

    const pastoralAndChurch = await this.pastoralRepository.findByNameAndChurch(
      payload.name,
      payload.churchId
    );

    if (pastoralAndChurch && pastoralAndChurch.id != id) {
      throw new ExceptionHandler(
        "ConflictError",
        `Pastoral ${payload.name} already exists to for ${payload.churchId}`,
        409
      );
    }

    const userIds = payload.userIds;

    for (const userId of userIds) {
      if (!(await this.userRepository.getById(userId))) {
        throw new ExceptionHandler(
          "NotFoundError",
          `User id ${userId} not found`,
          404
        );
      }
    }

    try {
      const pastoral = await this.pastoralRepository.update(id, payload);
      return {
        id: pastoral.id,
        uuid: pastoral.uuid,
        code: pastoral.code,
        name: pastoral.name,
        observation: pastoral.observation,
        church: {
          id: pastoral.church.id,
          corporateName: pastoral.church.corporateName,
        },
        enabled: pastoral.enabled,
        users: pastoral.users ? mapUsers(pastoral.users) : [],
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
