export interface CreateRoleInputDTO {
  name: string;
  code: number;
  description: string;
  enabled: boolean;
  churchId: number;
  permissionIds: number[];
}
