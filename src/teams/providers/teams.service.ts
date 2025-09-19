import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { Team } from '../teams.entity';
import { TeamMembers } from '../team-members/team-members.entity';
import { TeamLinks } from '../team-links/team-links.entity';
import { TeamMembersService } from '../team-members/providers/team-members.service';
import { TeamLinksService } from '../team-links/providers/team-links.service';
import { CreateTeamDto } from '../dtos/post-team.dto';
import { TeamMemberDto } from '../team-members/dtos/team-member.dto';
import { TeamMemberRole } from '../enums/team-member-role.enum';
import { TeamMemberStatus } from '../enums/team-member-status.enum';
import { SocialLinkDto } from '../team-links/dtos/social-link.dto';
import { SimpleLinkDto } from '../team-links/dtos/simple-link.dto';
import { UpdateTeamDto } from '../dtos/patch-team.dto';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { UploadEntity } from 'src/uploads/upload.entity';



@Injectable()
export class TeamsService {
    constructor(
        private readonly dataSource: DataSource,

        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,

        @InjectRepository(TeamMembers)
        private readonly memberRepo: Repository<TeamMembers>,

        @InjectRepository(TeamLinks)
        private readonly linkRepo: Repository<TeamLinks>,

        private readonly teamMembersService: TeamMembersService,
        private readonly teamLinksService: TeamLinksService,

        // ⬇️ Inject your uploads service
        private readonly uploadsService: UploadsService,
    ) { }

    /**
     * CREATE TEAM (transactional)
     * Supports either passing image IDs in the DTO OR raw files to upload.
     */
    async createTeam(
        dto: CreateTeamDto,
        adminUserId: number,
        files?: { profileImageFile?: Express.Multer.File; coverImageFile?: Express.Multer.File },
    ) {
        if (!adminUserId) throw new BadRequestException('admin user is required');

        return await this.dataSource.transaction(async (manager) => {
            const teamRepo = manager.getRepository(Team);

            // 1) Base team row
            const team = teamRepo.create({
                display_name: dto.display_name,
                website: dto.website,
                bio: dto.bio,
                payment_provider: dto.payment_provider,
                payment_provider_account: dto.payment_provider_account,
                admin: { id: adminUserId } as any,
            });

            // 2) Attach by IDs if provided (temporary)
            if (dto.profile_image_id) team.profile_image = { id: dto.profile_image_id } as any;
            if (dto.cover_image_id) team.cover_image = { id: dto.cover_image_id } as any;

            let savedTeam = await teamRepo.save(team);

            // 3) If raw files are provided, replace (upload + link) inside the same TX
            if (files?.profileImageFile) {
                savedTeam = await this.replaceProfileImage(savedTeam.id, files.profileImageFile, manager);
            }
            if (files?.coverImageFile) {
                savedTeam = await this.replaceCoverImage(savedTeam.id, files.coverImageFile, manager);
            }

            // 4) Ensure admin as member
            await this.teamMembersService.ensureAdminMember(savedTeam.id, adminUserId, manager);

            // 5) Add coaches / teammates
            const coachDtos: TeamMemberDto[] = (dto.coaches || []).map((m) => ({
                user_id: m.user_id,
                role: TeamMemberRole.COACH,
                status: TeamMemberStatus.ACTIVE,
            }));
            const teammateDtos: TeamMemberDto[] = (dto.team_mates || []).map((m) => ({
                user_id: m.user_id,
                role: TeamMemberRole.MEMBER,
                status: TeamMemberStatus.ACTIVE,
            }));
            if (coachDtos.length) await this.teamMembersService.addMultiple(savedTeam.id, coachDtos, adminUserId, manager);
            if (teammateDtos.length) await this.teamMembersService.addMultiple(savedTeam.id, teammateDtos, adminUserId, manager);

            // 6) Links
            const links: Array<SocialLinkDto | SimpleLinkDto> = [
                ...(dto.social_links || []),
                ...(dto.achievement_links || []),
                ...(dto.stats_links || []),
            ];
            if (links.length) {
                await this.teamLinksService.createMultiple(savedTeam.id, links, manager);
            }

            // 7) Return hydrated
            return await teamRepo.findOne({
                where: { id: savedTeam.id },
                relations: {
                    admin: true,
                    members: { user: true },
                    links: true,
                    profile_image: true,
                    cover_image: true,
                },
            });
        });
    }

    /**
     * UPDATE TEAM (transactional)
     * Can also accept new files to replace images, safely removing old uploads.
     */
    async updateTeam(
        id: number,
        dto: UpdateTeamDto,
        userId: number,
        files?: { profileImageFile?: Express.Multer.File; coverImageFile?: Express.Multer.File },
    ) {
        await this.assertCanManageTeam(id, userId);

        return await this.dataSource.transaction(async (manager) => {
            const repo = manager.getRepository(Team);
            const existing = await repo.findOne({
                where: { id },
                relations: ['profile_image', 'cover_image', 'admin'],
            });
            if (!existing) throw new NotFoundException('Team not found');

            // Patch primitives
            if (dto.display_name !== undefined) existing.display_name = dto.display_name;
            if (dto.website !== undefined) existing.website = dto.website;
            if (dto.bio !== undefined) existing.bio = dto.bio;
            if (dto.payment_provider !== undefined) existing.payment_provider = dto.payment_provider;
            if (dto.payment_provider_account !== undefined) existing.payment_provider_account = dto.payment_provider_account;

            // If IDs are provided, re-link directly (no file IO)
            if (dto.profile_image_id !== undefined) {
                existing.profile_image = dto.profile_image_id ? ({ id: dto.profile_image_id } as any) : null;
            }
            if (dto.cover_image_id !== undefined) {
                existing.cover_image = dto.cover_image_id ? ({ id: dto.cover_image_id } as any) : null;
            }

            await repo.save(existing);

            // If raw files provided, do safe replace via helpers
            let updated = existing;
            if (files?.profileImageFile) {
                updated = await this.replaceProfileImage(id, files.profileImageFile, manager);
            }
            if (files?.coverImageFile) {
                updated = await this.replaceCoverImage(id, files.coverImageFile, manager);
            }

            return await repo.findOne({
                where: { id },
                relations: {
                    admin: true,
                    members: { user: true },
                    links: true,
                    profile_image: true,
                    cover_image: true,
                },
            });
        });
    }

    // =========================
    // Image replace helpers
    // =========================

    private async replaceProfileImage(
        teamId: number,
        file: Express.Multer.File,
        manager: ReturnType<DataSource['createEntityManager']>,
    ): Promise<Team> {
        const teamRepo = manager.getRepository(Team);
        let team = await teamRepo.findOne({
            where: { id: teamId },
            relations: ['profile_image'],
        });
        if (!team) throw new BadRequestException('Team not found');

        try {
            if (team.profile_image) {
                const old = team.profile_image as UploadEntity;
                team.profile_image = null;
                await teamRepo.save(team);
                await this.uploadsService.deleteUpload(old);
            }
            // Upload and link new
            const newUpload = await this.uploadsService.uploadNew(file);
            team.profile_image = newUpload as any;
            team = await teamRepo.save(team);
            return team;
        } catch (e) {
            throw new InternalServerErrorException('Failed to replace team profile image');
        }
    }

    private async replaceCoverImage(
        teamId: number,
        file: Express.Multer.File,
        manager: ReturnType<DataSource['createEntityManager']>,
    ): Promise<Team> {
        const teamRepo = manager.getRepository(Team);
        let team = await teamRepo.findOne({
            where: { id: teamId },
            relations: ['cover_image'],
        });
        if (!team) throw new BadRequestException('Team not found');

        try {
            if (team.cover_image) {
                const old = team.cover_image as UploadEntity;
                team.cover_image = null;
                await teamRepo.save(team);
                await this.uploadsService.deleteUpload(old);
            }
            const newUpload = await this.uploadsService.uploadNew(file);
            team.cover_image = newUpload as any;
            team = await teamRepo.save(team);
            return team;
        } catch (e) {
            throw new InternalServerErrorException('Failed to replace team cover image');
        }
    }

    /**
     * LIST TEAMS (basic pagination + search)
     */
    async findAll(params: { page: number; limit: number; q?: string }) {
        const { page = 1, limit = 20, q } = params;
        const where = q
            ? { display_name: ILike(`%${q}%`) }
            : {};

        const [rows, total] = await this.teamRepo.findAndCount({
            where,
            order: { created_at: 'DESC' as any },
            skip: (page - 1) * limit,
            take: limit,
            relations: { admin: true },
        });

        return {
            data: rows,
            meta: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }

    /**
     * GET ONE TEAM (with members, links, uploads)
     */
    async findOne(id: number) {
        const team = await this.teamRepo.findOne({
            where: { id },
            relations: {
                admin: true,
                members: { user: true },
                links: true,
                profile_image: true,
                cover_image: true,
            },
        });
        if (!team) throw new NotFoundException('Team not found');
        return team;
    }

    /**
     * DELETE TEAM (soft delete)
     */
    async deleteTeam(id: number, userId: number) {
        await this.assertCanManageTeam(id, userId);
        const team = await this.teamRepo.findOne({ where: { id } });
        if (!team) return { success: true };
        await this.teamRepo.softRemove(team);
        return { success: true };
    }

    // ===== Members API (transactional where needed) =====

    async addMembers(teamId: number, members: TeamMemberDto[], userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            return this.teamMembersService.addMultiple(teamId, members, userId, manager);
        });
    }

    async updateMember(teamId: number, memberUserId: number, patch: Partial<TeamMemberDto>, userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            return this.teamMembersService.updateOne(teamId, memberUserId, patch, manager);
        });
    }

    async removeMember(teamId: number, memberUserId: number, userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            await this.teamMembersService.removeOne(teamId, memberUserId, manager);
            return { success: true };
        });
    }

    // ===== Links API (transactional) =====

    async addLinks(teamId: number, links: Array<SocialLinkDto | SimpleLinkDto>, userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            return this.teamLinksService.createMultiple(teamId, links, manager);
        });
    }

    async replaceLinks(teamId: number, links: Array<SocialLinkDto | SimpleLinkDto>, userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            // delete existing -> insert new (single TX)
            await manager.getRepository(TeamLinks).delete({ team: { id: teamId } as any });
            return this.teamLinksService.createMultiple(teamId, links, manager);
        });
    }

    async deleteLink(teamId: number, linkId: number, userId: number) {
        await this.assertCanManageTeam(teamId, userId);
        return await this.dataSource.transaction(async (manager) => {
            const repo = manager.getRepository(TeamLinks);
            const link = await repo.findOne({
                where: { id: linkId, team: { id: teamId } as any },
                relations: ['team'],
            });
            if (!link) return { success: true };
            await repo.remove(link);
            return { success: true };
        });
    }

    // ===== Permissions =====

    private async assertCanManageTeam(teamId: number, userId: number) {
        // Quick path: owner/admin on team row
        const team = await this.teamRepo.findOne({
            where: { id: teamId },
            relations: { admin: true },
        });
        if (!team) throw new NotFoundException('Team not found');

        if (team.admin?.id === userId) return;

        // Fallback: allow if user is TEAM ADMIN in members table
        const asAdmin = await this.memberRepo.findOne({
            where: {
                team: { id: teamId },
                user: { id: userId },
                role: TeamMemberRole.ADMIN,
                status: TeamMemberStatus.ACTIVE,
            },
            relations: ['team', 'users'],
        });

        if (!asAdmin) {
            throw new ForbiddenException('You are not allowed to manage this team');
        }
    }
}
