import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { ICityRepository } from "../../repositories/cities/IcitiesRepository";
import { CityValidador } from "../../validator/cityValidador";
import { CreateCityInputDTO } from "./dtos/createCityInputDTO";
import { ListOutputCityDTO } from "./dtos/listOutputCityDTO";

export class UpdateCityServices {
  constructor(readonly cityRepository: ICityRepository) {}

  public async execute(
    id: number,
    payload: CreateCityInputDTO
  ): Promise<ListOutputCityDTO> {
    CityValidador.handle([payload]);

    const cityAlreadyExists = await this.cityRepository.getById(id);

    if (!cityAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `City ${payload.name} Not Found`,
        409
      );
    }

    const cityWithSameNameAndUf =
      await this.cityRepository.getByNameAndUf(payload);

    if (cityWithSameNameAndUf && cityWithSameNameAndUf.id !== id) {
      throw new ExceptionHandler(
        "Error",
        `City with name ${payload.name} and UF ${payload.uf} already exists`,
        409
      );
    }

    try {
      const city = await this.cityRepository.update(id, payload);
      return {
        id: city.id,
        name: city.name,
        uuid: city.uuid,
        uf: city.uf.uf,
        enabled: city.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
