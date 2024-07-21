import { ExceptionHandler } from "../../../exceptions/ExceptionHandler";
import { cleanData } from "../../../helpers/clearDataHelper";
import { ConsultCnpjHelper } from "../../../helpers/consultCnpjHelper";
import { ConsultCnpjValidador } from "../../../validator/consultCnpjValidador";
import { ConsultOutputCNPJDTO } from "./dtos/consultOutputCnpjDTO";

export class ConsultCnpjServices {
  constructor(readonly helperCnpj = new ConsultCnpjHelper()) {}

  public async execute(cnpj: string): Promise<ConsultOutputCNPJDTO> {
    ConsultCnpjValidador.handle(cleanData(cnpj));

    const dataCnpj = await this.helperCnpj.handle(cnpj);

    if (dataCnpj.status === 429) {
      throw new ExceptionHandler(
        "ManyRequestError",
        "Many requests. Please try again later.",
        429
      );
    }

    if (dataCnpj.status === 200) {
      return {
        name: dataCnpj.data.nome,
        address: dataCnpj.data.logradouro,
        number: dataCnpj.data.numero,
        neighborhood: dataCnpj.data.bairro,
        complement: dataCnpj.data.complemento,
        city: dataCnpj.data.municipio,
        uf: dataCnpj.data.uf,
        codepostal: cleanData(dataCnpj.data.cep),
        phone: cleanData(dataCnpj.data.telefone),
        email: dataCnpj.data.email,
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
