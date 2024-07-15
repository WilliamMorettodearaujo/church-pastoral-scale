import { ChurchEntity } from "../../entities/churchEntity";
import { PastoralEntity } from "../../entities/pastoralEntity";
import { UserEntity } from "../../entities/userEntity";

export interface IPastoralRepository {
  save(
    pastoral: Partial<PastoralEntity>,
    church: Partial<ChurchEntity>,
    users: Partial<UserEntity[]>
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
  findByIdAndChurchId(
    id: number,
    churchId: number
  ): Promise<PastoralEntity | null>;
}
