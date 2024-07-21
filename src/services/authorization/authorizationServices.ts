import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IAuthorizationRepository } from "../../repositories/authorization/IauthorizationRepository";

export class AuthorizationServices {
  constructor(readonly authorizationRepository: IAuthorizationRepository) {}
  public async execute(roleId: number) {
    try {
      return await this.authorizationRepository.getPermissions(roleId);
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
