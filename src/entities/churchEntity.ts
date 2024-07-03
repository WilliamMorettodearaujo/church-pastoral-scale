import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasisEntity } from "./basisEntity";
import { CityEntity } from "./cityEntity";

@Entity("churchs")
export class ChurchEntity extends BasisEntity {
  @Column({
    name: "corporateName",
    type: "varchar",
    length: 100,
    default: null,
  })
  corporateName: string;

  @Column({
    name: "tradingName",
    type: "varchar",
    length: 100,
    default: null,
  })
  tradingName: string;

  @Column({
    name: "federalDocument",
    type: "varchar",
    length: 20,
    default: null,
  })
  federalDocument: string;

  @Column({
    name: "stateDocument",
    type: "varchar",
    length: 20,
    default: null,
  })
  stateDocument: string;

  @Column({
    name: "address",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  address?: string;

  @Column({
    name: "numberAddress",
    type: "varchar",
    length: 10,
    nullable: true,
  })
  numberAddress?: string;

  @Column({
    name: "complement",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  complement?: string;

  @Column({
    name: "district",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  district?: string;

  @Column({
    name: "codepostal",
    type: "varchar",
    length: 11,
    nullable: true,
  })
  codepostal?: string;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  @Column({
    name: "city_id",
    type: "bigint",
    default: null,
  })
  cityId?: CityEntity;

  @Column({
    name: "phone",
    type: "varchar",
    length: 15,
    nullable: true,
  })
  phone?: string;
  @Column({
    name: "cell",
    type: "varchar",
    length: 15,
    nullable: true,
  })
  cell?: string;
  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  email?: string;
  @Column({
    name: "home",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  home?: string;
  @Column({
    name: "observation",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  observation?: string;
  @Column({
    name: "picture",
    type: "varchar",
    length: 80,
    nullable: true,
  })
  picture?: string;
  @Column({
    name: "enabled",
    type: "boolean",
    default: true,
  })
  enabled: boolean;
}
