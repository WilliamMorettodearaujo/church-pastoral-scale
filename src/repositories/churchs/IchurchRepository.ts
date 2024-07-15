import { ChurchEntity } from "../../entities/churchEntity";

export interface IChurchRepository {
  save(church: Partial<ChurchEntity>): Promise<ChurchEntity>;
  getById(id: number): Promise<ChurchEntity | null>;
  getAll(): Promise<ChurchEntity[]>;
  update(id: number, church: Partial<ChurchEntity>): Promise<ChurchEntity>;
  delete(id: string): Promise<void>;
  findByDocumentFederal(federalDocument: string): Promise<ChurchEntity | null>;
}
