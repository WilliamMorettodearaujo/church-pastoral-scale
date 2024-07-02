import { Request, Response } from "express";
import { CityRepositoryTypeOrm } from "../../repositories/cities/citiesRepositoryTypeOrm";
import { CreateCityServices } from "../../services/cities/createCityServices";

export class CreateCityController {
  public async handle(req: Request, res: Response) {
    const cityRepository = new CityRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateCityServices(cityRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
