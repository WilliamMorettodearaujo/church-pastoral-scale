import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { GenerateTokenLoginProvider } from "../../providers/auth/generateTokenLoginProvider";
import { DecriptPasswordProvider } from "../../providers/passwords/decriptPasswordProvider";
import { IAuthenticationRepository } from "../../repositories/authentication/IauthenticationRepository";
import { LoginInputDTO } from "./dtos/loginInputDTO";
import { LoginOutputDTO } from "./dtos/loginOutputDTO";
export class LoginServices {
  constructor(readonly authenticationRepository: IAuthenticationRepository) {}

  public async execute(payload: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.authenticationRepository.login(payload.email);

    if (!user) {
      throw new ExceptionHandler(
        "NotFoundError",
        `Email ${payload.email} not already exists`,
        401
      );
    }

    const decriptPassword = new DecriptPasswordProvider();
    if (await decriptPassword.execute(payload.password, user.password)) {
      const provider = await new GenerateTokenLoginProvider();

      const token = await provider.execute(
        user.id,
        user.role.id,
        user.church.id
      );
      return {
        token: token,
      };
    } else {
      throw new ExceptionHandler("Error", "Email or password incorrect", 401);
    }
  }
}
