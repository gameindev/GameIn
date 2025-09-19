import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { OfferingsService } from './providers/offerings.service';
import { CreateOfferingDto } from './dtos/post-offering.dto';
import { CreateOfferingBundleDto } from './dtos/post-offering-bundle.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { FindOfferingsQueryDto } from './dtos/get-offering.dto';
import { Offering } from './offerings.entity';
import { OfferingOffersService } from './offering-offers/providers/offering-offers.service';
import { OfferingPriceService } from './offering-price/providers/offering-price.service';
import { PatchOfferingBundleDto } from './dtos/patch-offering-bundle.dto';
import { PatchOfferingDto } from './dtos/patch-offering.dto';
import { PatchOfferingOfferDto } from './offering-offers/dtos/patch-offering-offer.dto';
import { OfferingCategory } from './enums/offering-category.enum';

@Controller('offerings')
@ApiBearerAuth()
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
            'Returns paginated offerings with optional relations. Use `relations=user,offering_offers,offering_price` to include joins.',
    })
    @ApiOkResponse({
        description: 'Offerings list with pagination metadata',
        schema: {
            $ref: getSchemaPath(FindOfferingsQueryDto),
        },
    })
    @Auth(AuthType.None)
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
        description: 'Relations to include (comma-separated or repeated). Allowed: user, offering_offers, offering_price',
        isArray: true,
        type: String,
        example: ['user', 'offering_offers', 'offering_price'],
    })
    @ApiOkResponse({ description: 'Offering fetched successfully', type: Offering })
    // @Auth(AuthType.None)
    getOfferingById(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: FindOfferingsQueryDto,
    ) {
        return this.offeringService.findOneById(id, query.relations as any);
    }





    @ApiOperation({
        summary: 'Adjust an offering',
        description: 'Adjusts the offers parameters and logo based on the provided bundle DTOs.',
    })
    @ApiResponse({
        status: 200,
        description: 'Offering adjusted successfully',
    })
    @Patch(':id/adjust')
    @UseInterceptors(FileInterceptor('logo'))
    @ApiOperation({ summary: 'Adjust an offering' })
    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(PatchOfferingBundleDto, PatchOfferingDto, PatchOfferingOfferDto)
    @ApiResponse({ status: 200, description: 'Offering adjusted successfully' })    
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                offering: {
                    type: 'string',
                    example: JSON.stringify({
                        id: 1,
                        notes: 'Example notes',
                        offers: [
                            {
                                offering_id: 1,
                                offer_type: OfferingCategory.LOGO_STREAM,
                                repetition: '2',
                                duration: '20s',
                                size: 'PORTRAIT',
                            },
                        ],
                    }),
                },
                logo: { type: 'string', format: 'binary' },
            },
            required: ['offering'],
        },
    })
    async adjustOffer(
        @UploadedFile() logo: Express.Multer.File,
        @Body('offering') offeringRaw: string,
        @ActiveUser() user: ActiveUserData,
    ) {
        let parsed: PatchOfferingDto;

        try {
            parsed = JSON.parse(offeringRaw);
        } catch {
            throw new BadRequestException('Invalid JSON in offering');
        }

        // Manual transformation and validation
        const dto = new PatchOfferingBundleDto();
        dto.offering = parsed;

        if (!dto.offering.id) {
            throw new BadRequestException('Offering ID is required');
        }


        return this.offeringService.createAdjustment(dto, logo, user);
        
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



