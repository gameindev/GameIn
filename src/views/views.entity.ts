import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('profile_views')
export class ProfileView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  viewerId: number;

  @Column({ nullable: true, length: 64 })
  ipAddress: string;

  @Column()
  profileType: 'creator' | 'brand';

  @Column()
  profileId: number;

  @CreateDateColumn()
  viewedAt: Date;
}
