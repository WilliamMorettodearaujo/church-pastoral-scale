export interface ListUserOutputDTO {
  id: number;
  code: number;
  name: string;
  email: string;
  church: {
    id: number;
    corporateName: string;
  };
  enabled: boolean;
}
