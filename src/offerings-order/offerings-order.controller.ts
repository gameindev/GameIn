import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
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


    
    // Get all offering orders
    @Get()
    @ApiOperation({
        summary: 'Get all offering orders',
        description: 'Get all offering orders'
    })
    @ApiResponse({
        status: 200,
        description: 'Offering orders fetched successfully'
    })
    @UserTypes(UserType.BRAND)
    getAllOfferingOrders(
        @ActiveUser() user: ActiveUserData,
        @Query() query: FindOfferingOrdersQueryDto,
    ) {
        return this.offeringsOrderService.getAllOfferingOrders(user, query);
    }



    // Get an offering order by id
    @Get(':id')
    @ApiOperation({
        summary: 'Get an offering order by id',
        description: 'Get an offering order by id'
    })
    @ApiResponse({
        status: 200,
        description: 'Offering order fetched successfully'
    })
    @UserTypes(UserType.BRAND)
    getOfferingOrderById(
        @ActiveUser() user: ActiveUserData,
        @Param('id') id: number
    ) {
        return this.offeringsOrderService.getOfferingOrderById(id, user);
    }

    // Update an offering order
    
}
