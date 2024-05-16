import { ChurchEntity } from "../../entities/churchEntity";
import { IChurchRepository } from "./IchurchRepository";

export class ChurchRepositoryDatabase implements IChurchRepository {
  private churchs: ChurchEntity[] = [];
  async save(payload: ChurchEntity): Promise<ChurchEntity> {
    this.churchs.push(payload);
    return payload;
  }

  public async findByDocument(document: string): Promise<ChurchEntity> {
    return this.churchs.find((church) => church.cnpj === document);
  }
}
