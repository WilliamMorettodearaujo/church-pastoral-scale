import joi from "joi";
import { CreateUserInputDTO } from "../services/users/dtos/createUserInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class UserValidador {
  static handle(payload: CreateUserInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        churchId: joi.number().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
