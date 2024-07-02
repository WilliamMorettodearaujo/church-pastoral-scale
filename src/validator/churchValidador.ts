import { cnpj } from "cpf-cnpj-validator";
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
        corporateName: joi.string().required(),
        tradingName: joi.string().required(),
        federalDocument: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length === 14 && cnpj.isValid(value)) {
              return value;
            } else {
              return helpers.error("any.invalid");
            }
          }),
        stateDocument: joi.string().required(),
        address: joi.string().required(),
        numberAddress: joi.string().required(),
        complement: joi.string(),
        district: joi.string().required(),
        cityId: joi.number().required(),
        codepostal: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length !== 8) {
              return helpers.error("string.length");
            }

            return value;
          }),

        phone: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length !== 11) {
              return helpers.error("string.length");
            }
            return value;
          }),
        cell: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (value.length !== 11) {
              return helpers.error("string.length");
            }
            return value;
          }),
        email: joi.string().email().required(),
        home: joi.string().required(),
        observation: joi.string(),
        picture: joi.string(),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
