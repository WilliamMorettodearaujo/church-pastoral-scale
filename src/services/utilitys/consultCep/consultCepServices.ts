import { ExceptionHandler } from "../../../exceptions/ExceptionHandler";
import { cleanData } from "../../../helpers/clearDataHelper";
import { ConsultCepHelper } from "../../../helpers/consultCepHelper";
import { ConsultCepValidador } from "../../../validator/consultCepValidador";
import { ConsultOutputCepDTO } from "./dtos/consultOutputCepDTO";

export class ConsultCepServices {
  constructor(readonly helperCep = new ConsultCepHelper()) {}

  public async execute(cep: string): Promise<ConsultOutputCepDTO> {
    ConsultCepValidador.handle(cleanData(cep));

    const dataCep = await this.helperCep.execute(cep);

    if (dataCep.status === 429) {
      throw new ExceptionHandler(
        "Error",
        "Many requests. Please try again later.",
        429
      );
    }

    if (dataCep.status === 200) {
      return {
        address: dataCep.data.logradouro,
        neighborhood: dataCep.data.bairro,
        complement: dataCep.data.complement,
        city: dataCep.data.localidade,
        uf: dataCep.data.uf,
      };
    } else {
      throw new ExceptionHandler(
        "Error",
        "Unknown problem, try again later",
        500
      );
    }
  }
}
