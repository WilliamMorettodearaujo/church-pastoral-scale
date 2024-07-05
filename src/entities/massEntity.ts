import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasisEntity } from "./basisEntity";
import { ChurchEntity } from "./churchEntity";

@Entity("masses")
export class MassEntity extends BasisEntity {
  @Column({
    name: "code",
    type: "bigint",
  })
  code: number;
  @Column({
    name: "name",
    type: "varchar",
    length: 100,
    default: null,
  })
  name: string;

  @Column({
    name: "observation",
    type: "varchar",
    length: 255,
    default: null,
  })
  observation: string;

  @Column({
    name: "start_date_time",
    type: "timestamp",
    nullable: false,
  })
  startDateTime: Date;

  @ManyToOne(() => ChurchEntity)
  @JoinColumn({ name: "church_id", referencedColumnName: "id" })
  church: ChurchEntity;

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
