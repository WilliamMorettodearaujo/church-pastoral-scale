import { ListPermissionOutputDTO } from "../../permissions/dtos/listPermissionOutputDTO";

export interface ListRoleOutputDTO {
  id: number;
  uuid: string;
  code: number;
  name: string;
  description: string;
  permissions: ListPermissionOutputDTO[];
  enabled: boolean;
}
