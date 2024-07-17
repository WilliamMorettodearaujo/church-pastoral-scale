import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BasisEntity } from "./basisEntity";
import { ResourceEntity } from "./resourceEntity";
import { RoleEntity } from "./roleEntity";

@Entity("permissions")
export class PermissionEntity extends BasisEntity {
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

  @ManyToOne(() => ResourceEntity, { eager: true })
  @JoinColumn({ name: "resource_id", referencedColumnName: "id" })
  resource: ResourceEntity;

  @ManyToMany(
    () => RoleEntity,
    (rolePermissions) => rolePermissions.permissions
  )
  permissionsRole: RoleEntity[];
}
