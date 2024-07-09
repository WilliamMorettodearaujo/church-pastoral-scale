import { UserEntity } from "../../entities/userEntity";

export interface IAuthenticationRepository {
  login(email: string): Promise<UserEntity>;
  forgotPassword(email: string, passwordResetToken: string): Promise<boolean>;
  resetPassword(token: string, password: string): Promise<boolean>;
}
