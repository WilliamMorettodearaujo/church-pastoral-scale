import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { ListUserOutputDTO } from "../users/dtos/listUserOutputDTO";
import { ListPastoralOutputDTO } from "./dtos/listPastoralOutputDTO";

export class ListPastoralServices {
  constructor(
    readonly pastoralRepository: IPastoralRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(churchId: number): Promise<ListPastoralOutputDTO[]> {
    const church = await this.churchRepository.getById(churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church Not Found", 404);
    }

    try {
      const pastorals = await this.pastoralRepository.getAll(churchId);

      return pastorals.map((pastoral) => ({
        id: pastoral.id,
        code: pastoral.code,
        name: pastoral.name,
        observation: pastoral.observation,
        enabled: pastoral.enabled,
        users: pastoral.users ? this.mapUsers(pastoral.users) : [],
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }

  private mapUsers(users: ListUserOutputDTO[]) {
    return users.map((user) => ({
      id: user.id,
      code: user.code,
      name: user.name,
      email: user.email,
      enabled: user.enabled,
    }));
  }
}
