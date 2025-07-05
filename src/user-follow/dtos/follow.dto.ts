import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class FollowDto {
    @ApiProperty({
        description: 'ID of the user to follow',
        type: Number,
    })
  @IsInt()
  @IsPositive()
  followingId: number;
}
