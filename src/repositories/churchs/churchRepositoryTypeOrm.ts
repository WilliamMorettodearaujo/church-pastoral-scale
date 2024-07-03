import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { IChurchRepository } from "./IchurchRepository";

export class ChurchRepositoryTypeOrm implements IChurchRepository {
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(church: Partial<ChurchEntity>): Promise<ChurchEntity> {
    return await this.churchRepository.save(church);
  }

  async getById(id: number): Promise<ChurchEntity> {
    return await this.churchRepository.findOne({
      where: { id: id },
    });
  }

  async getAll(): Promise<ChurchEntity[]> {
    return await this.churchRepository.find({});
  }

  async update(
    id: number,
    church: Partial<ChurchEntity>
  ): Promise<ChurchEntity> {
    const entity = await this.churchRepository.findOne({
      where: { id: id },
    });
    this.churchRepository.merge(entity, church);
    return await this.churchRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.churchRepository.delete(id);
  }

  async findByDocumentFederal(federalDocument: string): Promise<ChurchEntity> {
    return await this.churchRepository.findOne({
      where: { federalDocument: federalDocument },
    });
  }
}
