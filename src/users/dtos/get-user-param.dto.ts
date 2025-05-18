/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

/**
 * Get users param DTO.
 */
export class GetUsersParamDto {

    /**
     * The ID of the user that you want the API to return.
     */
    @ApiProperty({
        required: true,
        description: 'The ID of the user that you want the API to return',
        type: Number,
        example: 1,
    })
    @IsInt()
    @Type(() => Number)
    id: number;
}
