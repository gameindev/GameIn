import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('profile_views')
export class ProfileView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  viewer_id: number;

  @Column({ nullable: true, length: 64 })
  ip_address: string;

  @Column()
  profile_type: 'creator' | 'brand';

  @Column({nullable: false})
  profile_id: number;

  @CreateDateColumn()
  viewed_at: Date;
}
