import { Response } from "express";
import { GetOneChurchService } from "../../services/churchs/getOneChurchServices";

export class GetOneChurchController {
  public async handle(id: number, res: Response) {
    const service = new GetOneChurchService();
    const output = await service.execute(id);
    res.json(output);
  }
}
