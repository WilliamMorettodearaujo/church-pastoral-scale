export interface CreateMassInputDTO {
  name: string;
  code?: number;
  observation: string;
  enabled: boolean;
  starDateTime: string;
  churchId: number;
}
