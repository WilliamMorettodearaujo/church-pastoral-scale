import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { IChurchRepository } from "./IchurchRepository";

export class churchRepositoryTypeOrm implements IChurchRepository {
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(payload: ChurchEntity): Promise<ChurchEntity> {
    return await this.churchRepository.save(payload);
  }

  async findByDocument(federalDocument: string): Promise<ChurchEntity> {
    return this.churchRepository.findOne({
      where: { federalDocument: federalDocument },
    });
  }
}
