export interface CreateMassInputDTO {
  name: string;
  code?: number;
  observation: string;
  enabled: boolean;
  startDateTime: Date;
  churchId: number;
  massScales: {
    pastoralId: number;
    userId: number[];
  };
}
