export interface ListMassOutputDTO {
  id: number;
  uuid: string;
  code: number;
  name: string;
  observation: string;
  startDateTime: Date;
  church: {
    id: number;
    corporateName: string;
  };
  scale: {
    id: number;
    pastoral: {
      id: number;
      name: string;
    };
    user: {
      id: number;
      name: string;
    }[];
  }[];
  enabled: boolean;
}
