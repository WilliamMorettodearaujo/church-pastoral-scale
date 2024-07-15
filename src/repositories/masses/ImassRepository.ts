import { ChurchEntity } from "../../entities/churchEntity";
import { MassEntity } from "../../entities/massEntity";
import { MassScalesEntity } from "../../entities/massScalesEntity";

export interface IMassRepository {
  save(
    mass: Partial<MassEntity>,
    church: Partial<ChurchEntity>,
    massScales: Partial<MassScalesEntity>
  ): Promise<MassEntity>;

  getById(id: number): Promise<MassEntity | null>;
  getAll(churchId: number): Promise<MassEntity[]>;
  update(id: number, mass: Partial<MassEntity>): Promise<MassEntity>;
  delete(id: string): Promise<void>;
}
