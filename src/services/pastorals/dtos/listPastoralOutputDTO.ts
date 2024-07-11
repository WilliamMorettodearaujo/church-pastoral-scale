export interface ListPastoralOutputDTO {
  id: number;
  code: number;
  name: string;
  observation: string;
  church?: {
    id: number;
    corporateName: string;
  };
  enabled: boolean;
  users?: {
    id: number;
    code: number;
    name: string;
    email: string;
    enabled: boolean;
  }[];
}
