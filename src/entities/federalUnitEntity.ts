import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("federal_units")
export class FederalUnitEntity {
  @PrimaryColumn({ type: "varchar", length: 2 })
  uf: string;

  @Column({ type: "varchar", length: 50 })
  name: string;
}
