import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { PastoralEntity } from "../../entities/pastoralEntity";
import { UserEntity } from "../../entities/userEntity";
import { IPastoralRepository } from "./IpastoralRepository";

export class PastoralRepositoryTypeOrm implements IPastoralRepository {
  pastoralRepository = AppDataSource.getRepository(PastoralEntity);
  churchRepository = AppDataSource.getRepository(ChurchEntity);
  userRepository = AppDataSource.getRepository(UserEntity);

  async save(
    pastoral: Partial<PastoralEntity>,
    church: Partial<ChurchEntity>,
    users: Partial<UserEntity[]>
  ): Promise<PastoralEntity> {
    const entityPastoral = this.pastoralRepository.create({
      ...pastoral,
      church: church,
      users: users,
    });
    return await this.pastoralRepository.save(entityPastoral);
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
      relations: ["church", "users"],
    });
  }

  async update(
    id: number,
    pastoral: Partial<PastoralEntity>
  ): Promise<PastoralEntity> {
    const entity = await this.pastoralRepository.findOne({
      where: { id: id },
      relations: ["church", "users"],
    });
    if (entity && pastoral && pastoral.users) {
      entity.users = pastoral.users;
    }

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
  async findByIdAndChurchId(
    id: number,
    churchId: number
  ): Promise<PastoralEntity | null> {
    return await this.pastoralRepository.findOne({
      where: {
        id: id,
        church: { id: churchId },
      },
      relations: ["church"],
    });
  }
}
