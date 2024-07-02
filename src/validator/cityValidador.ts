import joi from "joi";
import { CreateCityInputDTO } from "../services/cities/dtos/createCityInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class CityValidador {
  static handle(payload: CreateCityInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        uf: joi.string().required().length(2),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
