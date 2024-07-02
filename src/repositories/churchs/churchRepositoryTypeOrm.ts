import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";

import { IChurchRepository } from "./IchurchRepository";

export class ChurchRepositoryTypeOrm implements IChurchRepository {
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(payload: Partial<ChurchEntity>): Promise<ChurchEntity> {
    return await this.churchRepository.save(payload);
  }

  async findByDocumentFederal(
    federalDocument: string
  ): Promise<ChurchEntity | null> {
    return this.churchRepository.findOne({
      where: { federalDocument: federalDocument },
    });
  }

  async getById(id: number): Promise<ChurchEntity> {
    return await this.churchRepository.findOne({ where: { id: id } });
  }

  // async getAll(): Promise<ChurchEntity[]> {
  //   return await this.churchRepository.find();
  // }

  // async update(church: ChurchEntity): Promise<ChurchEntity> {
  //   return await this.churchRepository.save(church);
  // }

  // async delete(id: number): Promise<void> {
  //   await this.churchRepository.delete({where { id: id}});
  // }
}
