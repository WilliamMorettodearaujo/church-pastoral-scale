import joi from "joi";

import { CreateResourceInputDTO } from "../../services/resources/dtos/createResourceInputDTO";
import { JoiSchemaValidador } from "../joiSchemaValidador";
export class ResourceValidador {
  static handle(payload: CreateResourceInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required().max(100),
        description: joi.string().required().max(255),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
