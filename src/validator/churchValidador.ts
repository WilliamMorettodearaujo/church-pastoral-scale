import { cnpj, cpf } from "cpf-cnpj-validator";
import joi from "joi";
import { CreateChurchInputDTO } from "../services/churchs/dtos/createChurchInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class ChurchValidador {
  static handle(payload: CreateChurchInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        name: joi.string().required(),
        cnpj: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length === 11 && cpf.isValid(value)) {
              return value;
            } else if (value.length === 14 && cnpj.isValid(value)) {
              return value;
            } else {
              return helpers.error("any.invalid");
            }
          }),
        ie: joi.string().required(),
        // address: joi.string().required(),
        // neighborhood: joi.string().required(),
        // number: joi.string().required(),
        // complement: joi.string(),
        // city: joi.string().required(),
        // uf: joi.string().length(2).required(),
        // codepostal: joi
        //   .string()
        //   .required()
        //   .custom((value, helpers) => {
        //     if (value.length !== 8) {
        //       return helpers.error("string.length");
        //     }

        //     return value;
        //   }),
        // representative_name: joi.string().required(),
        // phone: joi
        //   .string()
        //   .required()
        //   .custom((value, helpers) => {
        //     if (value.length !== 11) {
        //       return helpers.error("string.length");
        //     }
        //     return value;
        //   }),
        // email: joi.string().email().required(),
        // enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
