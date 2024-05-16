import { ChurchEntity } from "../../entities/churchEntity";
import { createChurchOutputDTO } from "../../services/churchs/dtos/createChurchOutputDTO";

export interface IChurchRepository {
  findByDocument(cnpj: string): Promise<ChurchEntity>;
  save(church: ChurchEntity): Promise<createChurchOutputDTO>;
}
