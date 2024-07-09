export interface CreateUserInputDTO {
  code?: number;
  name: string;
  email: string;
  password: string;
  churchId: number;
  enabled: boolean;
}
