export interface CreateUserInputDTO {
  code?: number;
  name: string;
  email: string;
  password: string;
  churchId: number;
  roleId: number;
  enabled: boolean;
}
