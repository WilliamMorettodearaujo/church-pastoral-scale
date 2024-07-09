import { ChurchEntity } from "../../entities/churchEntity";
import { UserEntity } from "../../entities/userEntity";

export interface IUserRepository {
  create(
    user: Partial<UserEntity>,
    church: Partial<ChurchEntity>
  ): Promise<UserEntity>;
  getById(id: number): Promise<UserEntity | null>;
  getAll(churchId: number): Promise<UserEntity[]>;
  update(id: number, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string, churchId: number): Promise<UserEntity | null>;
}
