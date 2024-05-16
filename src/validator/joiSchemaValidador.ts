import { AnySchema } from "joi";
import { ValidationException } from "../exceptions/validationException";
export class JoiSchemaValidador {
  static handle<T>(shema: AnySchema, payload: T) {
    const { error } = shema.validate(payload, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw new ValidationException(
        " Schema inválido",
        String(error.details.map((details) => " " + details.message)),
        422
      );
    }

    return true;
  }
}
