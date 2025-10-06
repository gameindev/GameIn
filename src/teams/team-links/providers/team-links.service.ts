import { Type } from 'class-transformer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamLinks } from '../team-links.entity';
import { EntityManager, Repository } from 'typeorm';
import { SocialLinkDto } from '../dtos/social-link.dto';
import { SimpleLinkDto } from '../dtos/simple-link.dto';
import { TeamLinkType } from '../../enums/team-link-type.enum';

@Injectable()
export class TeamLinksService {

    constructor(
        @InjectRepository(TeamLinks)
        private readonly teamLinksRepo: Repository<TeamLinks>
    ) { }

    /**
     * Create multiple team links for a given team id.
     * Accepts a mixed array of SimpleLinkDto and SocialLinkDto.
     */
    async createMultiple(
        teamId: number,
        links: Array<SimpleLinkDto | SocialLinkDto>,
        manager?: EntityManager
    ): Promise<TeamLinks[]> {
        if (!teamId) {
            throw new BadRequestException('teamId is required');
        }
        if (!links || links.length === 0) return [];

        // Use the provided manager (transactional EntityManager or custom repo), or fallback to this.teamLinksRepo
        const repo = manager
            ? manager.getRepository(TeamLinks)
            : this.teamLinksRepo;

        const entities = links.map((dto) => {
            switch (dto.type) {
                case TeamLinkType.SOCIAL: {
                    const socialDto = dto as SocialLinkDto;
                    if (!socialDto.platform) {
                        throw new BadRequestException(
                            'platform is required for SOCIAL links',
                        );
                    }
                    return repo.create({
                        team: { id: teamId } as any,
                        type: TeamLinkType.SOCIAL,
                        platform: socialDto.platform,
                        label: socialDto.label ?? null,
                        url: socialDto.url,
                    });
                }

                case TeamLinkType.ACHIEVEMENT:
                case TeamLinkType.STATS: {
                    const simpleDto = dto as SimpleLinkDto;
                    return repo.create({
                        team: { id: teamId } as any,
                        type: simpleDto.type,
                        platform: null,
                        label: simpleDto.label ?? null,
                        url: simpleDto.url,
                    });
                }

                default:
                    throw new BadRequestException('Invalid link type');
            }
        });

        return await repo.save(entities);
    }
}
