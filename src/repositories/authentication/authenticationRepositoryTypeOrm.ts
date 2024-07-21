import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { UserEntity } from "../../entities/userEntity";
import { IAuthenticationRepository } from "./IauthenticationRepository";

export default class AuthenticationRepositoryTypeOrm
  implements IAuthenticationRepository
{
  userRepository = AppDataSource.getRepository(UserEntity);

  churchRepository = AppDataSource.getRepository(ChurchEntity);
  async login(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ["church"],
    });
  }
  async forgotPassword(
    email: string,
    passwordResetToken: string
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return false;
    }

    await this.userRepository.update(
      { email: email },
      { passwordResetToken: passwordResetToken }
    );

    return true;
  }

  async resetPassword(token: string, password: string): Promise<boolean> {
    const passwordResetToken = await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });

    if (!passwordResetToken) {
      return false;
    }
    await this.userRepository.update(
      { passwordResetToken: token },
      { password: password, passwordResetToken: null }
    );
    return true;
  }
}
