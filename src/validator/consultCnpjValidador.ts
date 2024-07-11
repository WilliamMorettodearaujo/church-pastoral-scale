import { cnpj } from "cpf-cnpj-validator";
import joi from "joi";
import { JoiSchemaValidador } from "./joiSchemaValidador";

export class ConsultCnpjValidador {
  static handle(cnpj: string) {
    JoiSchemaValidador.handle(this.schema(), { cnpj }); 
  }

  private static schema() {
    const schema = joi
      .object({
        cnpj: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length === 14 && cnpj.isValid(value)) {
              return value;
            } else {
              return helpers.error("any.invalid");
            }
          }),
      })
      .required();

    return schema; 
  }
}
