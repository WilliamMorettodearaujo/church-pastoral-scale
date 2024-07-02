import { AppDataSource } from "../../data-source";
import { FederalUnitEntity } from "../../entities/federalUnitEntity";
import { IFederalUnitRepository } from "./IfederalUnitRepository";

export class FederalUnitRepositoryTypeOrm implements IFederalUnitRepository {
  federalUnitRepository = AppDataSource.getRepository(FederalUnitEntity);
  async create(
    federalUnit: Partial<FederalUnitEntity>
  ): Promise<FederalUnitEntity> {
    return await this.federalUnitRepository.create(federalUnit);
  }
  async getById(uf: string): Promise<FederalUnitEntity> {
    return await this.federalUnitRepository.findOne({ where: { uf: uf } });
  }
  async getAll(): Promise<FederalUnitEntity[]> {
    return await this.federalUnitRepository.find();
  }
  async update(
    uf: string,
    federalUnit: Partial<FederalUnitEntity>
  ): Promise<FederalUnitEntity> {
    const entity = await this.federalUnitRepository.findOne({
      where: { uf: uf },
    });
    this.federalUnitRepository.merge(entity, federalUnit);
    return await this.federalUnitRepository.save(entity);
  }
  async delete(uf: string): Promise<void> {
    await this.federalUnitRepository.delete(uf);
  }
}
