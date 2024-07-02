import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IcityRepository } from "../../repositories/cities/IcitiesRepository";
import { CityValidador } from "../../validator/cityValidador";
import { CreateCityInputDTO } from "./dtos/createCityInputDTO";
import { CreateCityOutputDTO } from "./dtos/createCityOutputDTO";

export class CreateCityServices {
  constructor(readonly cityRepository: IcityRepository) {}

  public async execute(
    payload: CreateCityInputDTO
  ): Promise<CreateCityOutputDTO> {
    CityValidador.handle([payload]);

    const cityAlreadyExists = await this.cityRepository.getByNameAndUf(payload);

    if (cityAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `City ${payload.name} and UF ${payload.uf} already exists`,
        409
      );
    }

    try {
      const city = await this.cityRepository.create(payload);

      return {
        id: city.id,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error, 500);
    }
  }
}
