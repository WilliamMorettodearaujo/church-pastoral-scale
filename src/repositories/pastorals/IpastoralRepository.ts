import { ChurchEntity } from "../../entities/churchEntity";
import { PastoralEntity } from "../../entities/pastoralEntity";

export interface IPastoralRepository {
  create(
    pastoral: Partial<PastoralEntity>,
    church: Partial<ChurchEntity>
  ): Promise<PastoralEntity>;
  getById(id: number): Promise<PastoralEntity | null>;
  getAll(churchId: number): Promise<PastoralEntity[]>;
  update(
    id: number,
    pastoral: Partial<PastoralEntity>
  ): Promise<PastoralEntity>;
  delete(id: string): Promise<void>;
  findByNameAndChurch(
    name: string,
    churchId: number
  ): Promise<PastoralEntity | null>;
}
