import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { IChurchRepository } from "./IchurchRepository";

export class ChurchRepositoryDatabase implements IChurchRepository {
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(payload: ChurchEntity): Promise<ChurchEntity> {
    return await this.churchRepository.save(payload);
  }

  async findByDocument(cnpj: string): Promise<ChurchEntity> {
    return this.churchRepository.findOne({ where: { cnpj: cnpj } });
  }
}
