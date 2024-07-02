import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IcityRepository } from "../../repositories/cities/IcitiesRepository";

import { ListOutputCityDTO } from "./dtos/listOutputCityDTO";

export class ListCityServices {
  constructor(readonly cityRepository: IcityRepository) {}

  public async execute(): Promise<ListOutputCityDTO[]> {
    try {
      const citys = await this.cityRepository.getAll();

      return citys.map((city) => ({
        id: city.id,
        uuid: city.uuid,
        uf: city.uf.uf,
        name: city.name,
        enabled: city.enabled,
      }));
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
