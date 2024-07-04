import joi from "joi";
import { CreatePastoralInputDTO } from "../services/pastorals/dtos/createPastoralInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class PastoralValidador {
  static handle(payload: CreatePastoralInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        churchId: joi.number().required(),
        observation: joi.string(),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
