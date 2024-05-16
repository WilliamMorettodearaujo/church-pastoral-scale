import { Column, Entity } from "typeorm";
import { BasisEntity } from "./basisEntity";

@Entity("churchs")
export class ChurchEntity extends BasisEntity {
  @Column({
    name: "name",
    type: "varchar",
    length: 80,
    nullable: true,
    default: null,
  })
  name?: string;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  cnpj: string;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  ie?: string;
}
