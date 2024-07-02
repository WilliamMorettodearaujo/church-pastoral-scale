import { AppDataSource } from "../../data-source";
import { CityEntity } from "../../entities/cityEntity";
import { IcityRepository } from "./IcitiesRepository";

export class CityRepositoryTypeOrm implements IcityRepository {
  cityRepository = AppDataSource.getRepository(CityEntity);

  async create(city: Partial<CityEntity>): Promise<CityEntity> {
    return await this.cityRepository.save(city);
  }
  async getByNameAndUf(city: Partial<CityEntity>): Promise<CityEntity> {
    return await this.cityRepository.findOne({
      where: { name: city.name, uf: city.uf },
    });
  }

  async getById(id: number): Promise<CityEntity> {
    return await this.cityRepository.findOne({
      relations: {
        uf: true,
      },
      where: { id: id },
    });
  }

  async getAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find({
      relations: {
        uf: true,
      },
    });
  }
  async update(id: number, city: Partial<CityEntity>): Promise<CityEntity> {
    const entity = await this.cityRepository.findOne({
      where: { id: id },
    });
    this.cityRepository.merge(entity, city);
    return await this.cityRepository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.cityRepository.delete(id);
  }
}
