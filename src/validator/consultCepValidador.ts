import joi from "joi";
import { JoiSchemaValidador } from "./joiSchemaValidador";

export class ConsultCepValidador {
  static handle(cep: string) {JoiSchemaValidador.handle(this.schema(), { cep })}

  private static schema() {
    const schema = joi
      .object()
      .keys({
        cep: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length !== 8) {
              return helpers.error("string.length");
            }

            return value;
          }),
      })
      .required();

    return schema;
  }
}
