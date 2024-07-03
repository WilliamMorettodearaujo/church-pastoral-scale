import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { ICityRepository } from "../../repositories/cities/IcitiesRepository";
import { ListOutputCityDTO } from "./dtos/listOutputCityDTO";

export class GetOneCityService {
  constructor(readonly cityRepository: ICityRepository) {}

  public async execute(id: number): Promise<ListOutputCityDTO> {
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
