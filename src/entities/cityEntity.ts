import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasisEntity } from "./basisEntity";
import { FederalUnitEntity } from "./federalUnitEntity";

@Entity("cities")
export class CityEntity extends BasisEntity {
  @Column({
    name: "name",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  name: string;

  @ManyToOne(() => FederalUnitEntity)
  @JoinColumn({ name: "uf", referencedColumnName: "uf" })
  uf: FederalUnitEntity;

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
