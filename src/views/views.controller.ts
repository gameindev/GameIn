import { Controller, Patch, Param, Req, ParseIntPipe } from '@nestjs/common';
import { ViewsService } from './providers/views.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserType } from '../users/enums/user-type.enums';

@Controller('views')
export class ViewsController {
    constructor(private readonly viewsService: ViewsService) { }
    
    @ApiOperation({
        summary: 'Add unique view to a creator or brand profile',
    })
    @ApiResponse({
        status: 201,
        description: 'The view has been successfully added',
    })
    @ApiBearerAuth()
    @ApiParam({
        name: 'type',
        description: 'The type of profile to view',
        enum: UserType,
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the creator or brand profile',
        type: 'number',
    })
    
    @Patch(':type/:id/view')
    async addUniqueView(
        @Param('type') type: UserType.CREATOR | UserType.BRAND,
        @Param('id', ParseIntPipe) id: number,
        @Req() req
    ) {
        const userId = req.user?.id; // from auth middleware
        const ip = req.ip;
        return this.viewsService.addUniqueView({
            profile_id: id,
            profile_type: type,
            viewer_id: userId as number,
            ip_address: ip,
        });
    }
}
