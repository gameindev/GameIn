import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTeamDto } from './post-team.dto';

// Swagger-only DTO to document multipart form with files + fields
export class CreateTeamWithFilesDto extends CreateTeamDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary', nullable: true })
  profile_image?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary', nullable: true })
  cover_image?: any;
}

