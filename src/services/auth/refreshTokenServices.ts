import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { GenerateTokenResetPasswordProvider } from "../../providers/auth/generateTokenResetPasswordProvider";
import { VerifyTokenResetPasswordProvider } from "../../providers/auth/verifyTokenResetPasswordProvider";
import { LoginOutputDTO } from "./dtos/loginOutputDTO";
import { RefreshTokenInputDTO } from "./dtos/refreshTokenInputDTO";

export class RefreshTokenServices {
  public async execute(payload: RefreshTokenInputDTO): Promise<LoginOutputDTO> {
    const verifyToken = new VerifyTokenResetPasswordProvider();
    const tokenIsValid = await verifyToken.execute(payload.token);
    if (tokenIsValid) {
      const generateToken = await new GenerateTokenResetPasswordProvider();
      const refreshToken = await generateToken.execute(payload.email);
      return {
        token: refreshToken,
      };
    } else {
      throw new ExceptionHandler(
        "UnauthorizedError",
        "The provided token is invalid",
        401
      );
    }
  }
}
