import { Response } from "express";
import { GetOneMassService } from "../../services/masses/getOneMassServices";

export class GetOneMassController {
  public async handle(id: number, res: Response) {
    const service = new GetOneMassService();
    const output = await service.execute(id);
    res.json(output);
  }
}
