import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { ICityRepository } from "../../repositories/cities/IcitiesRepository";
import { ListCityOutputDTO } from "./dtos/listCityOutputDTO";

export class ListCityServices {
  constructor(readonly cityRepository: ICityRepository) {}

  public async execute(): Promise<ListCityOutputDTO[]> {
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
