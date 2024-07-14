import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MassEntity } from "./massEntity";
import { PastoralEntity } from "./pastoralEntity";
import { UserEntity } from "./userEntity";

@Entity("masses_scales")
export class MassScalesEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @ManyToOne(() => MassEntity, (mass) => mass.massScales)
  @JoinColumn({ name: "mass_id" })
  mass: MassEntity;

  @ManyToOne(() => PastoralEntity, (pastoral) => pastoral.pastoralScales)
  @JoinColumn({ name: "pastoral_id" })
  pastoral: PastoralEntity;

  @ManyToMany(() => UserEntity, (user) => user.userScales)
  @JoinTable({
    name: "mass_scales_users",
    joinColumn: { name: "mass_scale_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
  })
  users: UserEntity[];
}
