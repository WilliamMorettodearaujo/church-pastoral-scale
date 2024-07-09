import { Request, Response } from "express";

import AuthenticationRepositoryTypeOrm from "../../repositories/authentication/authenticationRepositoryTypeOrm";
import { ResetPasswordServices } from "../../services/auth/resetPasswordServices";
export class ResetPasswordController {
  public async handle(req: Request, res: Response) {
    const token: string | undefined = req.query.token as string;
    const payload = req.body;
    const authenticationRepository = new AuthenticationRepositoryTypeOrm();
    const service = new ResetPasswordServices(authenticationRepository);
    const output = await service.execute(token, payload);

    res.json(output);
  }
}
