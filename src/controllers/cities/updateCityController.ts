import { Request, Response } from "express";
import { CityRepositoryTypeOrm } from "../../repositories/cities/citiesRepositoryTypeOrm";
import { UpdateCityServices } from "../../services/cities/updateCityServices";

export class UpdateCityController {
  public async handle(id: number, req: Request, res: Response) {
    const cityRepository = new CityRepositoryTypeOrm();
    const payload = req.body;
    const service = new UpdateCityServices(cityRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
