export interface CreatePastoralInputDTO {
  name: string;
  code?: number;
  observation: string;
  enabled: boolean;
  churchId: number;
  userIds?: number[];
}
