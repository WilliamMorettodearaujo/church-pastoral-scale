import { Request, Response } from "express";
import AuthenticationRepositoryTypeOrm from "../../repositories/authentication/authenticationRepositoryTypeOrm";
import { LoginServices } from "../../services/auth/loginServices";

export class LoginController {
  public async handle(req: Request, res: Response) {
    const payload = req.body;
    const authenticationRepository = new AuthenticationRepositoryTypeOrm();
    const service = new LoginServices(authenticationRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
