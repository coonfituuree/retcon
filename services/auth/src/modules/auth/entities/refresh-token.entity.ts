import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AuthSession } from './auth-session.entity';

@Entity('refresh_tokens')
@Index('refresh_tokens_session_idx', ['sessionId'])
export class RefreshToken {
  @PrimaryColumn({ name: 'token_hash', type: 'char', length: 64 }) tokenHash!: string;
  @Column({ name: 'session_id', type: 'uuid' }) sessionId!: string;
  @Column({ name: 'consumed_at', type: 'timestamptz', nullable: true }) consumedAt!: Date | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
  @ManyToOne(() => AuthSession, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session!: AuthSession;
}
