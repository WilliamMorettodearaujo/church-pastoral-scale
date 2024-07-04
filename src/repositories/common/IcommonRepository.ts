export interface ICommonRepository {
  lastCodeByChurch(entity: string, churchId: number): Promise<number>;
}
