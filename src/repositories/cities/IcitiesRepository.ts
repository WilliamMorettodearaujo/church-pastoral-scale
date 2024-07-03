import { CityEntity } from "../../entities/cityEntity";

export interface ICityRepository {
  create(city: Partial<CityEntity>): Promise<CityEntity>;
  getByNameAndUf(city: Partial<CityEntity>): Promise<CityEntity | null>;
  getById(id: number): Promise<CityEntity | null>;
  getAll(): Promise<CityEntity[]>;
  update(id: number, city: Partial<CityEntity>): Promise<CityEntity>;
  delete(id: string): Promise<void>;
}
