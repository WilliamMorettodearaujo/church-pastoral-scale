import { ChurchEntity } from "../../entities/churchEntity";
import { MassEntity } from "../../entities/massEntity";

export interface IMassRepository {
  create(
    mass: Partial<MassEntity>,
    church: Partial<ChurchEntity>
  ): Promise<MassEntity>;
  getById(id: number): Promise<MassEntity | null>;
  getAll(churchId: number): Promise<MassEntity[]>;
  update(id: number, mass: Partial<MassEntity>): Promise<MassEntity>;
  delete(id: string): Promise<void>;
}
