import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { RoleEntity } from "../../entities/roleEntity";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "./IuserRepository";

export class UserRepositoryTypeOrm implements IUserRepository {
  userRepository = AppDataSource.getRepository(UserEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async save(
    user: Partial<UserEntity>,
    church: Partial<ChurchEntity>,
    role: Partial<RoleEntity>
  ): Promise<UserEntity> {
    const newUser = await this.userRepository.create({
      ...user,
      church: church,
      role: role,
    });
    return await this.userRepository.save(newUser);
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ["church", "role"],
    });
  }

  async getAll(churchId: number): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { church: { id: churchId } },
      relations: ["church", "role"],
    });
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    const entity = await this.userRepository.findOne({
      where: { id: id },
      relations: ["church", "role"],
    });
    this.userRepository.merge(entity, user);
    return await this.userRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(
    email: string,
    churchId?: number
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        email: email,
        church: { id: churchId },
      },
      relations: ["church"],
    });
  }

  async findByIds(ids: number[]): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findByIdAndChurchId(
    id: number,
    churchId: number
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        id: id,
        church: { id: churchId },
      },
      relations: ["church"],
    });
  }
}
