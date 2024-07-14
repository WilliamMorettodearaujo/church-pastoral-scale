import joi from "joi";

import { CreateMassInputDTO } from "../services/masses/dtos/createMassInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class MassValidador {
  static handle(payload: CreateMassInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        churchId: joi.number().required(),
        observation: joi.string().allow("").optional(),
        enabled: joi.boolean().optional(),
        startDateTime: joi.date().iso().required(),
        massScales: joi
          .object({
            pastoralId: joi.number().required(),
            userId: joi.array().items(joi.number()).required(),
          })
          .optional(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
