import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { PastoralEntity } from "../../entities/pastoralEntity";
import { UserEntity } from "../../entities/userEntity";
import { IPastoralRepository } from "./IpastoralRepository";

export class PastoralRepositoryTypeOrm implements IPastoralRepository {
  pastoralRepository = AppDataSource.getRepository(PastoralEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);
  userRepository = AppDataSource.getRepository(UserEntity);

  async create(
    pastoral: Partial<PastoralEntity>,
    church: Partial<ChurchEntity>,
    users: Partial<UserEntity[]>
  ): Promise<PastoralEntity> {
    const newUsers = await this.userRepository.findByIds(
      users.map((user) => user.id)
    );
    const newPastoral = this.pastoralRepository.create({
      ...pastoral,
      church: church,
      users: newUsers,
    });
    return await this.pastoralRepository.save(newPastoral);
  }

  async getById(id: number): Promise<PastoralEntity> {
    return await this.pastoralRepository.findOne({
      where: { id: id },
      relations: ["church", "users"],
    });
  }

  async getAll(churchId: number): Promise<PastoralEntity[]> {
    return await this.pastoralRepository.find({
      where: { church: { id: churchId } },
      relations: ["church"],
    });
  }

  async update(
    id: number,
    pastoral: Partial<PastoralEntity>
  ): Promise<PastoralEntity> {
    const entity = await this.pastoralRepository.findOne({
      where: { id: id },
      relations: ["church"],
    });
    this.pastoralRepository.merge(entity, pastoral);
    return await this.pastoralRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.pastoralRepository.delete(id);
  }

  async findByNameAndChurch(
    name: string,
    churchId: number
  ): Promise<PastoralEntity | null> {
    return await this.pastoralRepository.findOne({
      where: {
        name: name,
        church: { id: churchId },
      },
      relations: ["church"],
    });
  }
}
