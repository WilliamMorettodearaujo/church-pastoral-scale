import { Response } from "express";
import { GetOnePastoralService } from "../../services/pastorals/getOnePastoralServices";

export class GetOnePastoralController {
  public async handle(id: number, res: Response) {
    const service = new GetOnePastoralService();
    const output = await service.execute(id);
    res.json(output);
  }
}
