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
import { PermissionEntity } from "./permissionEntity";

@Entity("roles")
export class RoleEntity extends BasisEntity {
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
    name: "description",
    type: "varchar",
    length: 255,
    default: null,
  })
  description: string;

  @ManyToOne(() => ChurchEntity)
  @JoinColumn({ name: "church_id", referencedColumnName: "id" })
  church: ChurchEntity;

  @ManyToMany(
    () => PermissionEntity,
    (permission) => permission.permissionsRole,
    {
      eager: true,
      cascade: true,
      orphanedRowAction: "delete",
    }
  )
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions: PermissionEntity[];

  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
