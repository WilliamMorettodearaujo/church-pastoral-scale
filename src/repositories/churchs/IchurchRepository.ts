import { ChurchEntity } from "../../entities/churchEntity";

export interface IChurchRepository {
  create(church: Partial<ChurchEntity>): Promise<ChurchEntity>;
  getById(id: number): Promise<ChurchEntity | null>;
  // getAll(): Promise<ChurchEntity[]>;
  // update(user: ChurchEntity): Promise<ChurchEntity>;
  // delete(id: number): Promise<void>;
  findByDocumentFederal(federalDocument: string): Promise<ChurchEntity | null>;
}
