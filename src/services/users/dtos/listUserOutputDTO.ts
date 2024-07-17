import { ListRoleOutputDTO } from "../../roles/dtos/listRoleOutputDTO";

export interface ListUserOutputDTO {
  id: number;
  uuid: string;
  code: number;
  name: string;
  email: string;
  church: {
    id: number;
    corporateName: string;
  };
  role: ListRoleOutputDTO;
  enabled: boolean;
}
