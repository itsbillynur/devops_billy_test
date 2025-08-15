// src/sessions/entities/session.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('TBL_SESSIONS')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string; // tambahkan ini

  @Column()
  payload: string; // untuk simpan access_token

  @CreateDateColumn({ type: 'timestamp' })
  login: Date;

  @CreateDateColumn({ type: 'timestamp' })
  expired: Date;
}
