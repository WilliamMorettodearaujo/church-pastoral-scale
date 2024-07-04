import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { PastoralEntity } from "../../entities/pastoralEntity";
import { IPastoralRepository } from "./IpastoralRepository";

export class PastoralRepositoryTypeOrm implements IPastoralRepository {
  pastoralRepository = AppDataSource.getRepository(PastoralEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(
    pastoral: Partial<PastoralEntity>,
    church: Partial<ChurchEntity>
  ): Promise<PastoralEntity> {
    const newPastoral = this.pastoralRepository.create({
      ...pastoral,
      church: church,
    });
    return await this.pastoralRepository.save(newPastoral);
  }

  async getById(id: number): Promise<PastoralEntity> {
    return await this.pastoralRepository.findOne({
      where: { id: id },
      relations: ["church"],
    });
  }

  async getAll(): Promise<PastoralEntity[]> {
    return await this.pastoralRepository.find({
      relations: ["church"],
    });
  }

  async update(
    id: number,
    pastoral: Partial<PastoralEntity>
  ): Promise<PastoralEntity> {
    const entity = await this.pastoralRepository.findOne({
      where: { id: id },
    });
    this.pastoralRepository.merge(entity, pastoral);
    return await this.pastoralRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.pastoralRepository.delete(id);
  }

  async findByNameAndChurch(
    name: string,
    churchId: number
  ): Promise<PastoralEntity | null> {
    return await this.pastoralRepository.findOne({
      where: {
        name: name,
        church: { id: churchId },
      },
      relations: ["church"],
    });
  }
}
