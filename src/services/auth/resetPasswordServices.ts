import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { VerifyTokenResetPasswordProvider } from "../../providers/auth/verifyTokenResetPasswordProvider";
import { EncriptPasswordProvider } from "../../providers/passwords/encryptPasswordProvider";
import { IAuthenticationRepository } from "../../repositories/authentication/IauthenticationRepository";
import { ResetPasswordValidador } from "../../validator/resetPasswordValidador";

import { ResetPasswordOutputDTO } from "./dtos/resetPasswordOutputDTO copy";
import { ResetPasswordInputDTO } from "./dtos/resetTokenInputDTO";
export class ResetPasswordServices {
  constructor(readonly authenticationRepository: IAuthenticationRepository) {}

  public async execute(
    token: string,
    payload: ResetPasswordInputDTO
  ): Promise<ResetPasswordOutputDTO> {
    ResetPasswordValidador.handle([payload]);

    const VerifyToken = new VerifyTokenResetPasswordProvider();
    const generatedToken = VerifyToken.execute(token);

    if (generatedToken) {
      const passwordProvider = new EncriptPasswordProvider();
      payload.password = passwordProvider.execute(payload.password.toString());

      await this.authenticationRepository.resetPassword(
        token,
        payload.password
      );
      return {
        message: "Reset Password com sucesso",
      };
    } else {
      throw new ExceptionHandler("Error", "token is not valid", 401);
    }
  }
}
