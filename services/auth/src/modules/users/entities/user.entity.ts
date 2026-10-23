import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import type { Role } from '@retcon/contracts';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('users')
@Index('users_tenant_idx', ['tenantId', 'id'])
export class User {
  @PrimaryColumn('uuid') id!: string;
  @Column({ name: 'tenant_id', type: 'uuid' }) tenantId!: string;
  @Column({ type: 'varchar', length: 254, unique: true }) email!: string;
  @Column({ name: 'password_hash', type: 'text', select: false }) passwordHash!: string;
  @Column({ type: 'varchar', length: 16 }) role!: Role;
  @Column({ type: 'boolean', default: true }) active!: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
  @ManyToOne(() => Organization, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tenant_id' })
  organization!: Organization;
}
