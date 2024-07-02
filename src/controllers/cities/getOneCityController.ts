import { Response } from "express";
import { CityRepositoryTypeOrm } from "../../repositories/cities/citiesRepositoryTypeOrm";
import { GetOneCityService } from "../../services/cities/getOneCityServices";

export class GetOneCityController {
  public async handle(id: number, res: Response) {
    const cityRepository = new CityRepositoryTypeOrm();
    const service = new GetOneCityService(cityRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
