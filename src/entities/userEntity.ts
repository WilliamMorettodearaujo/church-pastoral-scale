import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BasisEntity } from "./basisEntity";
import { ChurchEntity } from "./churchEntity";
import { MassScalesEntity } from "./massScalesEntity";

@Entity("users")
export class UserEntity extends BasisEntity {
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
    name: "email",
    type: "varchar",
    length: 255,
  })
  email: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 255,
    default: null,
  })
  password: string;

  @Column({
    name: "password_reset_token",
    type: "varchar",
    length: 255,
    default: null,
  })
  passwordResetToken: string;

  @ManyToOne(() => ChurchEntity)
  @JoinColumn({ name: "church_id", referencedColumnName: "id" })
  church: ChurchEntity;

  @ManyToMany(() => MassScalesEntity, (massScale) => massScale.users)
  userScales: MassScalesEntity[];

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
