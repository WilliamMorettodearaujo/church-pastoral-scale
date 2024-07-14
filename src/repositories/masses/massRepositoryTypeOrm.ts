import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { MassEntity } from "../../entities/massEntity";
import { MassScalesEntity } from "../../entities/massScalesEntity";
import { IMassRepository } from "./ImassRepository";

export class MassRepositoryTypeOrm implements IMassRepository {
  massRepository = AppDataSource.getRepository(MassEntity);
  massScaleRepository = AppDataSource.getRepository(MassScalesEntity);
  entityManager = AppDataSource.manager;

  async save(
    mass: Partial<MassEntity>,
    church: Partial<ChurchEntity>,
    massScales: Partial<MassScalesEntity>
  ): Promise<MassEntity> {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const entityMass = this.massRepository.create({
          ...mass,
          church: church,
        });

        const savedMass = await transactionalEntityManager.save(entityMass);

        const entityMassScales = this.massScaleRepository.create({
          mass: savedMass,
          pastoral: massScales.pastoral,
          users: massScales.users,
        });

        await transactionalEntityManager.save(entityMassScales);

        return savedMass;
      }
    );
  }

  async getById(id: number): Promise<MassEntity> {
    return await this.massRepository.findOne({
      where: { id: id },
      relations: ["church", "massScales"],
    });
  }

  async getAll(churchId: number): Promise<MassEntity[]> {
    return await this.massRepository.find({
      where: { church: { id: churchId } },
      relations: ["church", "massScales"],
    });
  }

  async update(id: number, mass: Partial<MassEntity>): Promise<MassEntity> {
    const entity = await this.massRepository.findOne({
      where: { id: id },
      relations: ["church", "massScales"],
    });
    this.massRepository.merge(entity, mass);
    return await this.massRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.massRepository.delete(id);
  }
}
