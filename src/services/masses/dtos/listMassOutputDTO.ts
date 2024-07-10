export interface ListMassOutputDTO {
  id: number;
  code: number;
  name: string;
  observation: string;
  startDateTime: Date;
  church: {
    id: number;
    corporateName: string;
  };
  enabled: boolean;
}
