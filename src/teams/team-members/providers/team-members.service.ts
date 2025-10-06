import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { TeamMembers } from '../team-members.entity';
import { TeamMemberDto } from '../dtos/team-member.dto';
import { TeamMemberRole } from '../../enums/team-member-role.enum';
import { TeamMemberStatus } from '../../enums/team-member-status.enum';

@Injectable()
export class TeamMembersService {
    constructor(
        @InjectRepository(TeamMembers)
        private readonly teamMemberRepo: Repository<TeamMembers>,
    ) { }

    private getRepo(manager?: EntityManager) {
        return manager ? manager.getRepository(TeamMembers) : this.teamMemberRepo;
    }

    /**
     * Add multiple members to a team.
     * - Skips users already present in the team (by team_id + user_id).
     * - Sets addedBy and joinedAt.
     * - Defaults: role=MEMBER, status=ACTIVE (unless provided).
     */
    async addMultiple(
        teamId: number,
        members: TeamMemberDto[],
        addedByUserId: number,
        manager?: EntityManager,
    ): Promise<TeamMembers[]> {
        if (!teamId) throw new BadRequestException('teamId is required');
        if (!Array.isArray(members) || members.length === 0) return [];

        const repo = this.getRepo(manager);

        // Validate payload
        const userIds = members.map(m => m.user_id);
        if (userIds.some(u => !u || typeof u !== 'number')) {
            throw new BadRequestException('Each member must include a valid userId');
        }

        // Find existing mappings to avoid unique constraint errors
        const existing = await repo.find({
            where: { team: { id: teamId }, user: { id: In(userIds) } },
            relations: ['team', 'users'],
            select: { id: true, user: { id: true } as any }, // minimal selection
        });
 
        const existingIds = new Set(existing.map(e => e.user.id));
        const toCreate = members
            .filter(m => !existingIds.has(m.user_id))
            .map(m =>
                repo.create({
                    team: { id: teamId } as any,
                    user: { id: m.user_id } as any,
                    role: m.role ?? TeamMemberRole.MEMBER,
                    status: m.status ?? TeamMemberStatus.ACTIVE,
                    added_by: { id: addedByUserId } as any,
                    joined_at: new Date(),
                }),
            );

        if (toCreate.length === 0) return existing;

        return await repo.save(toCreate);
    }

    /**
     * Ensure the team creator is also present in team_members as ADMIN.
     * Idempotent (no duplicates).
     */
    async ensureAdminMember(
        teamId: number,
        adminUserId: number,
        manager?: EntityManager,
    ): Promise<TeamMembers> {
        const repo = this.getRepo(manager);

        let existing = await repo.findOne({
            where: { team: { id: teamId }, user: { id: adminUserId } },
            relations: ['team', 'users'],
        });

        if (existing) {
            // keep status ACTIVE and role ADMIN if any lower role
            if (existing.role !== TeamMemberRole.ADMIN || existing.status !== TeamMemberStatus.ACTIVE) {
                existing.role = TeamMemberRole.ADMIN;
                existing.status = TeamMemberStatus.ACTIVE;
                existing = await repo.save(existing);
            }
            return existing;
        }

        const created = repo.create({
            team: { id: teamId } as any,
            user: { id: adminUserId } as any,
            role: TeamMemberRole.ADMIN,
            status: TeamMemberStatus.ACTIVE,
            added_by: { id: adminUserId } as any,
            joined_at: new Date(),
        });
        return await repo.save(created);
    }

    /**
     * Update a single member (role and/or status).
     */
    async updateOne(
        teamId: number,
        memberUserId: number,
        patch: Partial<Pick<TeamMemberDto, 'role' | 'status'>>,
        manager?: EntityManager,
    ): Promise<TeamMembers> {
        if (!teamId || !memberUserId) throw new BadRequestException('teamId and memberUserId are required');

        const repo = this.getRepo(manager);
        const member = await repo.findOne({
            where: { team: { id: teamId }, user: { id: memberUserId } },
            relations: ['team', 'users'],
        });
        if (!member) throw new NotFoundException('Member not found');

        if (patch.role) member.role = patch.role;
        if (patch.status) member.status = patch.status;

        return await repo.save(member);
    }

    /**
     * Remove a member from a team (hard delete).
     * If you prefer soft removal, set status=REMOVED instead.
     */
    async removeOne(
        teamId: number,
        memberUserId: number,
        manager?: EntityManager,
    ): Promise<void> {
        if (!teamId || !memberUserId) throw new BadRequestException('teamId and memberUserId are required');

        const repo = this.getRepo(manager);
        const member = await repo.findOne({
            where: { team: { id: teamId }, user: { id: memberUserId } },
            relations: ['team', 'users'],
        });
        if (!member) return;

        await repo.remove(member);
    }

    /**
     * Optional helper: soft remove by marking status=REMOVED.
     */
    async markRemoved(
        teamId: number,
        memberUserId: number,
        manager?: EntityManager,
    ): Promise<TeamMembers> {
        const repo = this.getRepo(manager);
        const member = await repo.findOne({
            where: { team: { id: teamId }, user: { id: memberUserId } },
            relations: ['team', 'users'],
        });
        if (!member) throw new NotFoundException('Member not found');

        member.status = TeamMemberStatus.REMOVED;
        return await repo.save(member);
    }

    /**
     * Optional: list members of a team.
     */
    async listByTeam(
        teamId: number,
        manager?: EntityManager,
    ): Promise<TeamMembers[]> {
        const repo = this.getRepo(manager);
        return repo.find({
            where: { team: { id: teamId } },
            relations: ['users'],
            order: { role: 'ASC', created_at: 'ASC' as any },
        });
    }
}
