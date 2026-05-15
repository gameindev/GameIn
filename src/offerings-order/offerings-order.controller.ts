import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OfferingsOrderService } from './providers/offerings-order.service';
import { CreateOfferingOrderDto } from './dtos/post-offering-order.dto';
import { FindOfferingOrdersQueryDto } from './dtos/get-offering-order.dto';
import { UserType } from '../users/enums/user-type.enums';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';

@Controller('offerings-order')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class OfferingsOrderController {

    constructor(
        private readonly offeringsOrderService: OfferingsOrderService
    ) { }

    /**
     * Manual trigger for the same logic as the daily cron (mark PAID/IN_PROGRESS orders
     * DELIVERED when linked offering end_date is in the past).
     *
     * - Allowed when `NODE_ENV` is not `production`, OR when `ALLOW_RUN_AUTO_DELIVER_NOW=true`.
     * - Requires a normal Bearer token (any authenticated user).
     */
    @Post('run-auto-deliver-now')
    @ApiOperation({
        summary: 'Run auto-deliver job now (testing / ops)',
        description:
            'Non-production by default. In production set ALLOW_RUN_AUTO_DELIVER_NOW=true. Same rules as the scheduled job.',
    })
    @ApiResponse({ status: 200, description: '{ updated, failed } counts' })
    @ApiResponse({ status: 403, description: 'Blocked in production without opt-in env' })
    runAutoDeliverNow() {
        const env = process.env.NODE_ENV || 'development';
        if (env === 'production' && process.env.ALLOW_RUN_AUTO_DELIVER_NOW !== 'true') {
            throw new ForbiddenException(
                'run-auto-deliver-now is disabled in production unless ALLOW_RUN_AUTO_DELIVER_NOW=true',
            );
        }
        return this.offeringsOrderService.autoDeliverOrdersPastOfferingEnd();
    }



    // Create an offering order
    @Post()
    @ApiOperation({
        summary: 'Create an offering order',
        description: 'Create an offering order'
    })
    @ApiResponse({
        status: 201,
        description: 'Offering order created successfully'
    })
    @ApiBody({
        type: CreateOfferingOrderDto
    })
    @UserTypes(UserType.BRAND)
    createOfferingOrder(
        @ActiveUser() user: ActiveUserData,
        @Body() createOfferingOrderDto: CreateOfferingOrderDto
    ) {
        return this.offeringsOrderService.createOfferingOrder(createOfferingOrderDto, user);
    }


    
    // Get all offering orders (brand: orders they placed; creator: orders where they are the creator)
    @Get()
    @ApiOperation({
        summary: 'Get all offering orders',
        description: 'Get all offering orders. Brands see orders they placed; creators see orders where they are the creator.'
    })
    @ApiResponse({
        status: 200,
        description: 'Offering orders fetched successfully'
    })
    @UserTypes(UserType.BRAND, UserType.CREATOR)
    getAllOfferingOrders(
        @ActiveUser() user: ActiveUserData,
        @Query() query: FindOfferingOrdersQueryDto,
    ) {
        return this.offeringsOrderService.getAllOfferingOrders(user, query);
    }



    // Get an offering order by id (brand or creator who owns the order)
    @Get(':id')
    @ApiOperation({
        summary: 'Get an offering order by id',
        description: 'Get an offering order by id. Allowed if current user is the brand or the creator of the order.'
    })
    @ApiResponse({
        status: 200,
        description: 'Offering order fetched successfully'
    })
    @UserTypes(UserType.BRAND, UserType.CREATOR)
    getOfferingOrderById(
        @ActiveUser() user: ActiveUserData,
        @Param('id') id: number
    ) {
        return this.offeringsOrderService.getOfferingOrderById(id, user);
    }

    // Update an offering order
    
}
