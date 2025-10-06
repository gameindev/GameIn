import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "../teams.entity";
import { TeamLinkType } from "../enums/team-link-type.enum";
import { SocialPlatform } from "@/social-integration/enums/social-platform.enums";

/**
 * TeamLinks Entity
 */
@Entity({ name: "team_links" })
export class TeamLinks {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("idx_team_links_team")
    @ManyToOne(() => Team, t => t.links, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Index("idx_team_links_type")
    @Column({
        type: 'enum',
        enum: TeamLinkType,
        enumName: 'team_link_type_enum',
    })
    type: TeamLinkType;

    @Column({ type: 'varchar', length: 64, nullable: true })
    platform: SocialPlatform | string;

    @Column({ type: 'varchar', length: 120, nullable: true })
    label: string;

    @Column({ type: 'text' })
    url: string;

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date; 

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date;
}