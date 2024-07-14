import { PastoralEntity } from "../../entities/pastoralEntity";
import { UserEntity } from "../../entities/userEntity";
import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ICommonRepository } from "../../repositories/common/IcommonRepository";
import { IMassRepository } from "../../repositories/masses/ImassRepository";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { MassValidador } from "../../validator/massValidador";

import { CreateMassInputDTO } from "./dtos/createMassInputDTO";
import { createMassOutputDTO } from "./dtos/createMassOutputDTO";

export class CreateMassServices {
  constructor(
    readonly repository: ICommonRepository,
    readonly massRepository: IMassRepository,
    readonly churchRepository: IChurchRepository,
    readonly pastoralRepository: IPastoralRepository,
    readonly userRepository: IUserRepository
  ) {}

  public async execute(
    payload: CreateMassInputDTO
  ): Promise<createMassOutputDTO> {
    MassValidador.handle([payload]);

    const church = await this.churchRepository.getById(payload.churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church not found", 404);
    }

    let users: UserEntity[] = [];
    let pastoral: PastoralEntity;

    if (payload.massScales.pastoralId) {
      pastoral = await this.getPastoralByIdAndChurchId(payload);
    }
    if (payload.massScales.userId) {
      users = await this.getUsersByIdsAndChurchId(payload);
    }

    try {
      payload.code = await this.repository.lastCodeByChurch(
        "masses",
        payload.churchId
      );

      const mass = {
        name: payload.name,
        code: payload.code,
        observation: payload.observation,
        enabled: payload.enabled,
        startDateTime: payload.startDateTime,
      };

      delete church.city;

      const massScales = {
        users: users,
        pastoral: pastoral,
      };

      const masses = await this.massRepository.save(mass, church, massScales);

      return {
        id: masses.id,
        code: masses.code,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }

  private async getUsersByIdsAndChurchId(
    payload: CreateMassInputDTO
  ): Promise<UserEntity[]> {
    const users: UserEntity[] = [];
    for (const userId of payload.massScales.userId) {
      const churchId = payload.churchId;
      const userEntity = await this.userRepository.findByIdAndChurchId(
        userId,
        churchId
      );
      if (userEntity) {
        users.push(userEntity);
      } else {
        throw new ExceptionHandler("Error", `User id ${userId} not found`, 404);
      }
    }
    return users;
  }

  private async getPastoralByIdAndChurchId(
    payload: CreateMassInputDTO
  ): Promise<PastoralEntity> {
    const pastoralId = payload.massScales.pastoralId;
    const churchId = payload.churchId;

    const pastoralEntity = await this.pastoralRepository.findByIdAndChurchId(
      pastoralId,
      churchId
    );
    if (pastoralEntity) {
      return pastoralEntity;
    } else {
      throw new ExceptionHandler(
        "Error",
        `Pastoral id ${pastoralId} not found`,
        404
      );
    }
  }
}
