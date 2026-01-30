import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { OfferingsService } from './providers/offerings.service';
import { CreateOfferingDto } from './dtos/post-offering.dto';
import { CreateOfferingBundleDto } from './dtos/post-offering-bundle.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FindOfferingsQueryDto } from './dtos/get-offering.dto';
import { Offering } from './offerings.entity';
import { OfferingOffersService } from './offering-offers/providers/offering-offers.service';
import { OfferingPriceService } from './offering-price/providers/offering-price.service';
import { PatchOfferingBundleDto } from './dtos/patch-offering-bundle.dto';
import { PatchOfferingDto } from './dtos/patch-offering.dto';
import { PatchOfferingOfferDto } from './offering-offers/dtos/patch-offering-offer.dto';
import { OfferingCategory } from './enums/offering-category.enum';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { UserType } from '../users/enums/user-type.enums';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('offerings')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class OfferingsController {

    constructor(
        /**
         * Injecting Offering Service.
         */
        private readonly offeringService: OfferingsService,
        private readonly offeringOffersService: OfferingOffersService,
        private readonly offeringPriceService: OfferingPriceService
    ) { }

    @ApiOperation({
        summary: 'Creates a new Offering'
    })
    @ApiResponse({
        status: 201,
        description: 'Offering created successfully based on the query'
    })
    @Post()
    @ApiBody({ type: CreateOfferingBundleDto })
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.CREATOR)
    createOffering(
        @ActiveUser() user: ActiveUserData,
        @Body() createOfferingBundleDto: CreateOfferingBundleDto
    ) {
        return this.offeringService.createOfferingBundle(createOfferingBundleDto, user);
    }


    @Get()
    @ApiOperation({
        summary: 'List offerings',
        description:
            'Returns paginated offerings with optional relations. Use `relations=user,offering_offers,offering_prices,offering_price` to include joins.',
    })
    @ApiOkResponse({
        description: 'Offerings list with pagination metadata',
        schema: {
            $ref: getSchemaPath(FindOfferingsQueryDto),
        },
    })
    getOfferings(@Query() query: FindOfferingsQueryDto) {
        return this.offeringService.findAll(query);
    }


    @Get('/:id')
    @ApiOperation({
        summary: 'Get an offering by ID',
        description:
            'Returns a single offering. Optionally include relations via the relations query param.',
    })
    @ApiParam({ name: 'id', type: Number, description: 'Offering ID' })
    @ApiQuery({
        name: 'relations',
        required: false,
        description: 'Relations to include (comma-separated or repeated). Allowed: user, offering_offers, offering_prices, offering_price',
        isArray: true,
        type: String,
        example: ['users', 'offering_offers', 'offering_prices', 'offering_price'],
    })
    @ApiOkResponse({ description: 'Offering fetched successfully', type: Offering })
    getOfferingById(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: FindOfferingsQueryDto,
    ) {
        return this.offeringService.findOneById(id, query.relations as any);
    }





    @ApiOperation({
        summary: 'Adjust an offering',
        description: 'Adjusts the offers parameters, price, and logo based on the provided bundle DTOs.',
    })
    @ApiResponse({
        status: 200,
        description: 'Offering adjusted successfully',
    })
    @UseInterceptors(FileInterceptor('logo'))
    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(PatchOfferingBundleDto, PatchOfferingDto, PatchOfferingOfferDto)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                offering: {
                    type: 'string',
                    example: JSON.stringify({
                        id: 1,
                        notes: 'Example notes',
                        status: 'OFFERED',
                        start_date: '2025-09-01T10:00:00.000Z',
                        end_date: '2025-09-10T10:00:00.000Z',
                        offers: [
                            {
                                offering_id: 1,
                                offer_type: OfferingCategory.LOGO_STREAM,
                                repetition: '2',
                                duration: '20s',
                                size: 'PORTRAIT',
                            },
                        ],
                        price: {
                            price: '1,000.00',
                            platform_fee: '75.00',
                            tax: '215.00',
                            total: '1,290.00',
                            payment_provider: 'PAYPAL',
                        },
                    }),
                },
                logo: { type: 'string', format: 'binary' },
            },
            required: ['offering'],
        },
    })
    @Patch(':id/adjust')
    async adjustOffer(
        @UploadedFile() logo: Express.Multer.File,
        @Body('offering') offeringRaw: string,
        @ActiveUser() user: ActiveUserData,
    ) {
        let parsed: any;

        try {
            parsed = JSON.parse(offeringRaw);
        } catch {
            throw new BadRequestException('Invalid JSON in offering');
        }

        // Extract price and offers from parsed object if they exist
        const { price, offers, ...offeringData } = parsed;

        // Manual transformation and validation
        const dto = new PatchOfferingBundleDto();
        dto.offering = offeringData as PatchOfferingDto;
        
        // Add offers to bundle if provided
        if (offers) {
            dto.offers = offers;
        }
        
        // Add price to bundle if provided
        if (price) {
            dto.price = price;
        }

        if (!dto.offering.id) {
            throw new BadRequestException('Offering ID is required');
        }


        return this.offeringService.createAdjustment(dto, logo, user);

    }


    @ApiOperation({
        summary: 'Creates a new Offering'
    })
    @ApiResponse({
        status: 201,
        description: 'Offering created successfully based on the query'
    })
    @ApiParam({
        type: Number,
        name: 'id',
        example: 1
    })
    @Patch(':id/reset')
    async resetOffering(
        @Param('id') id: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.offeringService.resetOffering(id, user);
    }




    @ApiOperation({
        summary: 'Accept an offering',
        description: 'Accepts the offering and updates the status to accepted.',
    })
    @ApiResponse({
        status: 200,
        description: 'Offering accepted successfully',
    })
    @ApiParam({
        type: Number,
        name: 'id',
        example: 1
    })
    @Patch(':id/accept')
    async acceptOffering(
        @Param('id') id: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.offeringService.acceptOffering(id, user);
    }


    @ApiOperation({
        summary: 'Negotiate an offering',
        description: 'Negotiates the offering and updates the status to pending.',
    })
    @ApiResponse({
        status: 200,
        description: 'Offering negotiated successfully',
    })
    @ApiParam({
        type: Number,
        name: 'id',
        example: 1
    })
    @Patch(':id/negotiate')
    async negotiateOffering(
        @Param('id') id: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.offeringService.negotiateOffering(id, user);
    }



    // @Patch(':id/price')
    // async adjustPrice(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() dto: CreateOfferingPriceDto
    // ) {
    //     return this.offeringPriceService.updatePrice(id, dto);
    // }



    // @Delete('/:id/soft-delete')
    // softDeleteOffering() {

    // }



    // @Delete('/:id')
    // deleteOffering() {

    // }
}



