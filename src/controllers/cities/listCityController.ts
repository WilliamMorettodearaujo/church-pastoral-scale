import { Response } from "express";
import { CityRepositoryTypeOrm } from "../../repositories/cities/citiesRepositoryTypeOrm";
import { ListCityServices } from "../../services/cities/listCityServices";

export class ListCityController {
  public async handle(res: Response) {
    const cityRepository = new CityRepositoryTypeOrm();
    const service = new ListCityServices(cityRepository);
    const output = await service.execute();
    res.json(output);
  }
}
