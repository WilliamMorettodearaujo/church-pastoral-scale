import { FederalUnitEntity } from "../../entities/federalUnitEntity";

export interface IFederalUnitRepository {
  save(federalUnit: Partial<FederalUnitEntity>): Promise<FederalUnitEntity>;
  getById(uf: string): Promise<FederalUnitEntity | null>;
  getAll(): Promise<FederalUnitEntity[]>;
  update(
    uf: string,
    federalUnit: Partial<FederalUnitEntity>
  ): Promise<FederalUnitEntity>;
  delete(uf: string): Promise<void>;
}
