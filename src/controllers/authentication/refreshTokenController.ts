import { Request, Response } from "express";
import { RefreshTokenServices } from "../../services/auth/refreshTokenServices";

export class RefreshTokenController {
  public async handle(req: Request, res: Response) {
    const payload = req.body;
    const service = new RefreshTokenServices();
    const output = await service.execute(payload);
    res.json(output);
  }
}
