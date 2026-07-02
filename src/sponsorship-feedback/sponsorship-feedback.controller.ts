import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserType } from '../users/enums/user-type.enums';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { SponsorshipFeedbackService } from './sponsorship-feedback.service';
import { SubmitSponsorshipFeedbackDto } from './dto/submit-sponsorship-feedback.dto';

@ApiTags('sponsorship-feedback')
@Controller('sponsorship-feedback')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class SponsorshipFeedbackController {
    constructor(private readonly sponsorshipFeedbackService: SponsorshipFeedbackService) {}

    @Get('creator/summary')
    @UserTypes(UserType.CREATOR)
    @ApiOperation({
        summary: 'Aggregated sponsorship ratings from all brands (creator dashboard)',
    })
    getCreatorRatingSummary(@ActiveUser() user: ActiveUserData) {
        return this.sponsorshipFeedbackService.getCreatorRatingAggregate(user.sub);
    }

    @Get('creator/:creatorUserId/summary')
    @UserTypes(UserType.BRAND, UserType.CREATOR, UserType.ADMIN, UserType.COMMUNITY)
    @ApiOperation({
        summary: 'Public aggregated sponsorship ratings for a creator profile',
    })
    getCreatorPublicRatingSummary(@Param('creatorUserId', ParseIntPipe) creatorUserId: number) {
        return this.sponsorshipFeedbackService.getCreatorRatingAggregate(creatorUserId);
    }

    @Get('creator/:creatorUserId/brand-context')
    @UserTypes(UserType.BRAND)
    @ApiOperation({
        summary: 'Brand view: creator rating summary and pending feedback order',
    })
    getBrandCreatorRatingContext(
        @ActiveUser() user: ActiveUserData,
        @Param('creatorUserId', ParseIntPipe) creatorUserId: number,
    ) {
        return this.sponsorshipFeedbackService.getBrandRatingContextForCreator(
            creatorUserId,
            user.sub,
        );
    }

    @Get('order/:orderId')
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Get rating context for an offering order (brand only)' })
    getOrderContext(
        @ActiveUser() user: ActiveUserData,
        @Param('orderId', ParseIntPipe) orderId: number,
    ) {
        return this.sponsorshipFeedbackService.getOrderContextForBrand(orderId, user.sub);
    }

    @Post()
    @UserTypes(UserType.BRAND)
    @ApiOperation({ summary: 'Submit sponsorship feedback for a delivered order (brand only)' })
    submit(@ActiveUser() user: ActiveUserData, @Body() dto: SubmitSponsorshipFeedbackDto) {
        return this.sponsorshipFeedbackService.submit(dto, user.sub);
    }
}
