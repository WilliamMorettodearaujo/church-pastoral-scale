import axios from "axios";
export class ConsultCnpjHelper {
  public async handle(cnpj: string) {
    const res = await axios
      .get(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return e.response;
      });

    return res;
  }
}
