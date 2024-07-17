import joi from "joi";

import { CreateRoleInputDTO } from "../../services/roles/dtos/createRoleInputDTO";
import { JoiSchemaValidador } from "../joiSchemaValidador";

export class RoleValidador {
  static handle(payload: CreateRoleInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        churchId: joi.number().required(),
        description: joi.string().allow("").optional(),
        enabled: joi.boolean().optional(),
        permissionIds: joi.array().items(joi.number()).optional(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
