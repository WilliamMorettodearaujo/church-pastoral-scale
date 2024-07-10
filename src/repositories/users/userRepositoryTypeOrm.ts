import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { UserEntity } from "../../entities/userEntity";
import { IUserRepository } from "./IuserRepository";

export class UserRepositoryTypeOrm implements IUserRepository {
  userRepository = AppDataSource.getRepository(UserEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(
    user: Partial<UserEntity>,
    church: Partial<ChurchEntity>
  ): Promise<UserEntity> {
    const newUser = await this.userRepository.create({
      ...user,
      church: church,
    });
    return await this.userRepository.save(newUser);
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ["church"],
    });
  }

  async getAll(churchId: number): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { church: { id: churchId } },
      relations: ["church"],
    });
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    const entity = await this.userRepository.findOne({
      where: { id: id },
      relations: ["church"],
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
}
