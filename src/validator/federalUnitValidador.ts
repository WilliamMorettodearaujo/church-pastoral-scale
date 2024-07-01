import joi from "joi";
import { CreateFederalUnitInputDTO } from "../services/federalUnits/dtos/createFederalUnitInputDTO";
import { JoiSchemaValidador } from "./joiSchemaValidador";
export class FederalUnitValidador {
  static handle(payload: CreateFederalUnitInputDTO[]) {
    JoiSchemaValidador.handle(this.schema(), payload);
  }

  private static schema() {
    const schema = joi
      .object()
      .keys({
        uf: joi.string().required(),
        name: joi.string().required(),
        enabled: joi.boolean(),
      })
      .required();

    return joi.array().items(schema).required();
  }
}
