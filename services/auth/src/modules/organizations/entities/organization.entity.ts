import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryColumn('uuid') id!: string;
  @Column({ type: 'varchar', length: 160 }) name!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}
