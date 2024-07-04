// src/repositories/CommonRepositoryTypeOrm.ts
import { AppDataSource } from "../../data-source";
import { ICommonRepository } from "./IcommonRepository";

export class CommonRepositoryTypeOrm implements ICommonRepository {
  async lastCodeByChurch(tableName: string, churchId: number): Promise<number> {
    const query = await AppDataSource.query(
      `SELECT MAX(code) as code FROM ${tableName} WHERE church_id = ${churchId};`
    );
    return query[0]?.code ? +query[0].code + 1 : 1;
  }
}
