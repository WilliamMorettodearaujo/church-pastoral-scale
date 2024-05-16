import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasisEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn({ name: "created_at", select: false })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt: string;

  @DeleteDateColumn({ name: "deleted_at", select: false })
  deletedAt: string;
}
