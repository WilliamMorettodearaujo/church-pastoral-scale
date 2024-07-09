import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { ListUserOutputDTO } from "./dtos/listUserOutputDTO";

export class ListUserServices {
  constructor(readonly userRepository: IUserRepository) {}

  public async execute(): Promise<ListUserOutputDTO[]> {
    try {
      const users = await this.userRepository.getAll();
      return users.map((user) => ({
        id: user.id,
        code: user.code,
        name: user.name,
        email: user.email,
        churchId: user.church.id,
        churchCorporateName: user.church.corporateName,
        enabled: user.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
