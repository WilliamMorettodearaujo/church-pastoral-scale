import { AppDataSource } from "../../data-source";
import { ChurchEntity } from "../../entities/churchEntity";
import { ExceptionHandler } from "../../exceptions/ExceptionHandler";

import { IChurchRepository } from "./IchurchRepository";

export class ChurchRepositoryTypeOrm implements IChurchRepository {
  churchRepository = AppDataSource.getRepository(ChurchEntity);

  async create(payload: Partial<ChurchEntity>): Promise<ChurchEntity> {
    try {
      return await this.churchRepository.save(payload);
    } catch (error) {
      const errorMessage = `Failed to create ChurchEntity with federalDocument: ${payload.federalDocument}. Error: ${error.message}`;
      throw new ExceptionHandler("Database Error", errorMessage, 500);
    }
  }

  async findByDocumentFederal(
    federalDocument: string
  ): Promise<ChurchEntity | null> {
    return this.churchRepository.findOne({
      where: { federalDocument: federalDocument },
    });
  }
}
