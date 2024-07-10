import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { BasisEntity } from "./basisEntity";
import { ChurchEntity } from "./churchEntity";
import { UserEntity } from "./userEntity";

@Entity("pastorals")
export class PastoralEntity extends BasisEntity {
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

  @ManyToOne(() => ChurchEntity)
  @JoinColumn({ name: "church_id", referencedColumnName: "id" })
  church: ChurchEntity;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable({ name: "pastorals_users" })
  users: UserEntity[];

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
