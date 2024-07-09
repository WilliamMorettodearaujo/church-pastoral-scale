import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { MassEntity } from "../../entities/massEntity";
import { IMassRepository } from "./ImassRepository";

export class MassRepositoryTypeOrm implements IMassRepository {
  massRepository = AppDataSource.getRepository(MassEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(
    mass: Partial<MassEntity>,
    church: Partial<ChurchEntity>
  ): Promise<MassEntity> {
    const newMass = this.massRepository.create({
      ...mass,
      church: church,
    });

    return await this.massRepository.save(newMass);
  }

  async getById(id: number): Promise<MassEntity> {
    return await this.massRepository.findOne({
      where: { id: id },
      relations: ["church"],
    });
  }

  async getAll(churchId: number): Promise<MassEntity[]> {
    return await this.massRepository.find({
      where: { church: { id: churchId } },
      relations: ["church"],
    });
  }

  async update(id: number, mass: Partial<MassEntity>): Promise<MassEntity> {
    const entity = await this.massRepository.findOne({
      where: { id: id },
      relations: ["church"],
    });
    this.massRepository.merge(entity, mass);
    return await this.massRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.massRepository.delete(id);
  }
}
