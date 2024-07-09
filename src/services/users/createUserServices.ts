import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { EncriptPasswordProvider } from "../../providers/passwords/encryptPasswordProvider";
import { IChurchRepository } from "../../repositories/churchs/IchurchRepository";
import { ICommonRepository } from "../../repositories/common/IcommonRepository";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { UserValidador } from "../../validator/userValidador";
import { CreateUserInputDTO } from "./dtos/createUserInputDTO";
import { createUserOutputDTO } from "./dtos/createUserOutputDTO";

export class CreateUserServices {
  constructor(
    readonly commonRepository: ICommonRepository,
    readonly userRepository: IUserRepository,
    readonly churchRepository: IChurchRepository
  ) {}

  public async execute(
    payload: CreateUserInputDTO
  ): Promise<createUserOutputDTO> {
    UserValidador.handle([payload]);

    const userAlreadyExists = await this.userRepository.findByEmail(
      payload.email,
      payload.churchId
    );

    if (userAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Email ${payload.email} already exists for the church ${payload.churchId}`,
        409
      );
    }

    const church = await this.churchRepository.getById(payload.churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church not found", 404);
    }

    try {
      payload.code = await this.commonRepository.lastCodeByChurch(
        "users",
        payload.churchId
      );

      const passwordProvider = new EncriptPasswordProvider();
      payload.password = passwordProvider.handle(payload.password.toString());

      delete church.city;
      const user = await this.userRepository.create(payload, church);

      return {
        id: user.id,
        code: user.code,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
