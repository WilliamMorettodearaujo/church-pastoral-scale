export interface ListPermissionOutputDTO {
  id: number;
  name: string;
  description: string;
  resource: {
    id: number;
    name: string;
    description: string;
  };
  enabled: boolean;
}
