import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { EncriptPasswordProvider } from "../../providers/passwords/encryptPasswordProvider";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { UserValidador } from "../../validator/userValidador";
import { CreateUserInputDTO } from "./dtos/createUserInputDTO";
import { ListUserOutputDTO } from "./dtos/listUserOutputDTO";

export class UpdateUserServices {
  constructor(readonly userRepository: IUserRepository) {}

  public async execute(
    id: number,
    payload: CreateUserInputDTO
  ): Promise<ListUserOutputDTO> {
    UserValidador.handle([payload]);

    const userAlreadyExists = await this.userRepository.getById(id);

    if (!userAlreadyExists) {
      throw new ExceptionHandler("NotFoundError", `User ${id} Not Found`, 404);
    }

    const userAndChurch = await this.userRepository.findByEmail(
      payload.email,
      payload.churchId
    );

    if (userAndChurch && userAndChurch.id != id) {
      throw new ExceptionHandler(
        "ConflictError",
        `User with email: ${payload.email} already exists for the ${payload.churchId}`,
        409
      );
    }

    try {
      const passwordProvider = new EncriptPasswordProvider();
      payload.password = passwordProvider.execute(payload.password.toString());

      const user = await this.userRepository.update(id, payload);
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
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
