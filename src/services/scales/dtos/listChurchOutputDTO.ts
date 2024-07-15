export interface ListScaleOutputDTO {
  id: number;
  pastoral: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  }[];
}
