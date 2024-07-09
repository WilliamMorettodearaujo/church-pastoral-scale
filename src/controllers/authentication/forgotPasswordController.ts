import { Request, Response } from "express";
import AuthenticationRepositoryTypeOrm from "../../repositories/authentication/authenticationRepositoryTypeOrm";
import { UserRepositoryTypeOrm } from "../../repositories/users/userRepositoryTypeOrm";
import { ForgotPasswordService } from "../../services/auth/forgotPasswordServices";

export class ForgotPasswordController {
  public async handle(req: Request, res: Response) {
    const email = req.body.email;
    const authenticationRepository = new AuthenticationRepositoryTypeOrm();
    const userRepository = new UserRepositoryTypeOrm();

    const service = new ForgotPasswordService(
      authenticationRepository,
      userRepository
    );
    const output = await service.execute(email);

    res.json(output);
  }
}
