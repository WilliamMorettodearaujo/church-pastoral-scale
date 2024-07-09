import joi from "joi";
import { ResetPasswordInputDTO } from "../services/auth/dtos/resetTokenInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class ResetPasswordValidador {
  static handle(payload: ResetPasswordInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        password: joi.string().min(8).required(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
