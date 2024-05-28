import { ChurchEntity } from "../../entities/churchEntity";
import { createChurchOutputDTO } from "../../services/churchs/dtos/createChurchOutputDTO";

export interface IChurchRepository {
  findByDocumentFederal(federalDocument: string): Promise<ChurchEntity | null>;
  create(church: Partial<ChurchEntity>): Promise<createChurchOutputDTO>;
  // getById(id: number): Promise<ChurchEntity | null>;
  // getAll(): Promise<ChurchEntity[]>;
  // update(user: ChurchEntity): Promise<ChurchEntity>;
  // delete(id: number): Promise<void>;
}
