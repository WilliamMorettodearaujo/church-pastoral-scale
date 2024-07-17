import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { ListUserOutputDTO } from "./dtos/listUserOutputDTO";

export class ListUserServices {
  constructor(
    readonly userRepository: IUserRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(churchId: number): Promise<ListUserOutputDTO[]> {
    const church = await this.churchRepository.getById(churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church Not Found", 404);
    }

    try {
      const users = await this.userRepository.getAll(churchId);
      return users.map((user) => ({
        id: user.id,
        uuid: user.uuid,
        code: user.code,
        name: user.name,
        email: user.email,
        church: {
          id: user.church.id,
          corporateName: user.church.corporateName,
        },
        role: user.role,
        enabled: user.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
