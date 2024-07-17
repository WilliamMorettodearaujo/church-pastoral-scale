import { Column, Entity } from "typeorm";
import { BasisEntity } from "./basisEntity";

@Entity("resources")
export class ResourceEntity extends BasisEntity {
  @Column({
    name: "name",
    type: "varchar",
    length: 100,
    default: null,
  })
  name: string;

  @Column({
    name: "description",
    type: "varchar",
    length: 255,
    default: null,
  })
  description: string;

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
