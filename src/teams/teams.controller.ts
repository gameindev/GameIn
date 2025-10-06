import { ActiveUserData } from './../auth/interfaces/active-user-data.interface';
// src/teams/teams.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamsService } from './providers/teams.service';
import { CreateTeamDto } from './dtos/post-team.dto';
import { CreateTeamWithFilesDto } from './dtos/post-team.with-files.dto';
import { TeamMemberDto } from './team-members/dtos/team-member.dto';
import { ActiveUser } from '@/auth/decorators/active-user.decorator';
import { SimpleLinkDto } from './team-links/dtos/simple-link.dto';
import { SocialLinkDto } from './team-links/dtos/social-link.dto';
import { UpdateTeamDto } from './dtos/patch-team.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';




@ApiTags('Teams')
@ApiBearerAuth()
@ApiExtraModels(CreateTeamWithFilesDto, CreateTeamDto, TeamMemberDto, SocialLinkDto, SimpleLinkDto)
@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    // ===== Teams CRUD =====

    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'profile_image', maxCount: 1 },
            { name: 'cover_image', maxCount: 1 },
        ]),
    )        
    @ApiOperation({ summary: 'Create a new team (admin = current user)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateTeamWithFilesDto })
    @Post()
    createTeam(
        @Body() dto: CreateTeamDto,
        @UploadedFiles()
        files: { profile_image?: Express.Multer.File[]; cover_image?: Express.Multer.File[] },
        @ActiveUser() user: ActiveUserData
    ) {

        console.log(dto, files)

        return this.teamsService.createTeam(dto, user.sub, {
            profileImageFile: files?.profile_image?.[0],
            coverImageFile: files?.cover_image?.[0],
        });
    }

    @ApiOperation({ summary: 'List teams (pagination + search)' })
    @Get()
    findAll(
        @Query('page', ParseIntPipe) page = 1,
        @Query('limit', ParseIntPipe) limit = 20,
        @Query('q') q?: string,
    ) {
        // Make sure page and limit are always numbers (not undefined)
        const query = { page: Number(page), limit: Number(limit), q };
        return this.teamsService.findAll(query);
    }

    @ApiOperation({ summary: 'Get a team by ID (members, links, images)' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.teamsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a team (only admin/authorized)' })
    @Patch(':id')
    updateTeam(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTeamDto,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.updateTeam(id, dto, user.sub);
    }

    @ApiOperation({ summary: 'Soft delete a team (only admin/authorized)' })
    @Delete(':id')
    deleteTeam(
        @Param('id', ParseIntPipe) id: number,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.deleteTeam(id, user.sub);
    }

    // ===== Members =====

    @ApiOperation({ summary: 'Add member(s) to a team' })
    @Post(':id/members')
    addMembers(
        @Param('id', ParseIntPipe) teamId: number,
        @Body() members: TeamMemberDto[] | TeamMemberDto,
        @ActiveUser() user: ActiveUserData
    ) {
        const list = Array.isArray(members) ? members : [members];
        return this.teamsService.addMembers(teamId, list, user.sub);
    }

    @ApiOperation({ summary: 'Update a team member (role/status)' })
    @Patch(':id/members/:userId')
    updateMember(
        @Param('id', ParseIntPipe) teamId: number,
        @Param('userId', ParseIntPipe) memberUserId: number,
        @Body() patch: Partial<TeamMemberDto>,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.updateMember(teamId, memberUserId, patch, user.sub);
    }

    @ApiOperation({ summary: 'Remove a member from a team' })
    @Delete(':id/members/:userId')
    removeMember(
        @Param('id', ParseIntPipe) teamId: number,
        @Param('userId', ParseIntPipe) memberUserId: number,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.removeMember(teamId, memberUserId, user.sub);
    }

    // ===== Links =====

    @ApiOperation({ summary: 'Add links (social / achievement / stats)' })
    @Post(':id/links')
    addLinks(
        @Param('id', ParseIntPipe) teamId: number,
        @Body() links: Array<SocialLinkDto | SimpleLinkDto>,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.addLinks(teamId, links, user.sub);
    }

    @ApiOperation({ summary: 'Replace all links for a team' })
    @Patch(':id/links')
    replaceLinks(
        @Param('id', ParseIntPipe) teamId: number,
        @Body() links: Array<SocialLinkDto | SimpleLinkDto>,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.replaceLinks(teamId, links, user.sub);
    }

    @ApiOperation({ summary: 'Delete a single link by ID' })
    @Delete(':id/links/:linkId')
    deleteLink(
        @Param('id', ParseIntPipe) teamId: number,
        @Param('linkId', ParseIntPipe) linkId: number,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.teamsService.deleteLink(teamId, linkId, user.sub);
    }
}
