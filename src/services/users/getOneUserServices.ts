import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { ListUserOutputDTO } from "./dtos/listUserOutputDTO";

export class GetOneUserService {
  constructor(readonly userRepository: IUserRepository) {}

  public async execute(id: number): Promise<ListUserOutputDTO> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new ExceptionHandler("NotFoundError", "User Not Found", 404);
    }

    return {
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
    };
  }
}
