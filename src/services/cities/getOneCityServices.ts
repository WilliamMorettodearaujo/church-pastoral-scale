import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { ICityRepository } from "../../repositories/cities/IcitiesRepository";
import { ListCityOutputDTO } from "./dtos/listCityOutputDTO";

export class GetOneCityService {
  constructor(readonly cityRepository: ICityRepository) {}

  public async execute(id: number): Promise<ListCityOutputDTO> {
    const city = await this.cityRepository.getById(id);

    if (!city) {
      throw new ExceptionHandler("Error", "City Not Found", 404);
    }
    return {
      id: city.id,
      uuid: city.uuid,
      name: city.name,
      uf: city.uf.uf,
      enabled: city.enabled,
    };
  }
}
