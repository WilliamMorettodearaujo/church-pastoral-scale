import { ChurchEntity } from "../../entities/churchEntity";
import { createChurchOutputDTO } from "../../services/churchs/dtos/createChurchOutputDTO";

export interface IChurchRepository {
  findByDocument(cnpj: string): Promise<ChurchEntity>;
  create(church: ChurchEntity): Promise<createChurchOutputDTO>;
  // getById(id: number): Promise<ChurchEntity | null>;
  // getAll(): Promise<ChurchEntity[]>;
  // update(user: ChurchEntity): Promise<ChurchEntity>;
  // delete(id: number): Promise<void>;
}
