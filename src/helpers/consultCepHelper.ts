import axios from "axios";
export class ConsultCepHelper {
  public async execute(cep: string) {
    const res = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return e.response;
      });

    return res;
  }
}
