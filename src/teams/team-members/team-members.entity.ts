import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "../teams.entity";
import { TeamMemberRole } from "../enums/team-member-role.enum";
import { TeamMemberStatus } from "../enums/team-member-status.enum";
import { User } from "../../users/user.entity";


/**
 * TeamMembers Entity
 */

@Entity({ name: "team_members" })
export class TeamMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("idx_team_members_team")
    @ManyToOne(() => Team, t => t.members, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Index("idx_team_members_user")
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: TeamMemberRole,
        enumName: 'team_member_role_enum',
        default: TeamMemberRole.MEMBER,
        nullable: false
    })
    role: TeamMemberRole;

    @Column({
        type: 'enum',
        enum: TeamMemberStatus,
        enumName: 'team_member_status_enum',
        default: TeamMemberStatus.ACTIVE,
    })
    status: TeamMemberStatus;

    @Column({ name: 'joined_at', type: 'timestamptz', nullable: true, default: () => 'now()' })
    joined_at?: Date;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'added_by_user_id' })
    added_by?: User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updated_at: Date;
}