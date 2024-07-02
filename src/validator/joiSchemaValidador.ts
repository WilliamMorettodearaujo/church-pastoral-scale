import { AnySchema } from "joi";
import { ExceptionHandler } from "../exceptions/ExceptionHandler";
export class JoiSchemaValidador {
  static handle<T>(shema: AnySchema, payload: T) {
    const { error } = shema.validate(payload, {
      allowUnknown: false,
      abortEarly: false,
    });
    if (error) {
      throw new ExceptionHandler(
        "Schema inválido",
        String(error.details.map((details) => " " + details.message)),
        422
      );
    }

    return true;
  }
}
