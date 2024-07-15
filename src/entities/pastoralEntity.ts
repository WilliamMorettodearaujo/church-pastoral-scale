import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BasisEntity } from "./basisEntity";
import { ChurchEntity } from "./churchEntity";
import { MassScalesEntity } from "./massScalesEntity";
import { UserEntity } from "./userEntity";

@Entity("pastorals")
export class PastoralEntity extends BasisEntity {
  @Column({
    name: "code",
    type: "bigint",
  })
  code?: number;
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

  @ManyToOne(() => ChurchEntity)
  @JoinColumn({ name: "church_id", referencedColumnName: "id" })
  church: ChurchEntity;

  @ManyToMany(() => UserEntity, { cascade: true, orphanedRowAction: "delete" })
  @JoinTable({ name: "pastorals_users" })
  users: UserEntity[];

  @OneToMany(
    () => MassScalesEntity,
    (pastoralScales) => pastoralScales.pastoral
  )
  pastoralScales: MassScalesEntity;

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
