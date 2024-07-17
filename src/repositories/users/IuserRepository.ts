import { ChurchEntity } from "../../entities/churchEntity";
import { RoleEntity } from "../../entities/roleEntity";
import { UserEntity } from "../../entities/userEntity";

export interface IUserRepository {
  save(
    user: Partial<UserEntity>,
    church: Partial<ChurchEntity>,
    role: Partial<RoleEntity>
  ): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity | null>;
  getAll(churchId: number): Promise<UserEntity[]>;
  update(id: number, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string, churchId?: number): Promise<UserEntity | null>;
  findByIds(ids: number[]): Promise<UserEntity[]>;
  findByIdAndChurchId(id: number, churchId: number): Promise<UserEntity | null>;
}
