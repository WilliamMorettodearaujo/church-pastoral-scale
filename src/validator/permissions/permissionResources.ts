import joi from "joi";

import { CreatePermissionInputDTO } from "../../services/permissions/dtos/createPermissionInputDTO";
import { JoiSchemaValidador } from "../joiSchemaValidador";
export class PermissionValidador {
  static handle(payload: CreatePermissionInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required().max(100),
        description: joi.string().required().max(255),
        enabled: joi.boolean(),
        resourceId: joi.number().required(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
