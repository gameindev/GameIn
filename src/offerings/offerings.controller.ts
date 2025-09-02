import { Body, Controller, Delete, Get, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { OfferingsService } from './providers/offerings.service';
import { CreateOfferingDto } from './dtos/post-offering.dto';
import { CreateOfferingBundleDto } from './dtos/post-offering-bundle.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FindOfferingsQueryDto } from './dtos/get-offering.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('offerings')
@ApiBearerAuth()
export class OfferingsController {

    constructor(
        /**
         * Injecting Offering Service.
         */
        private readonly offeringService: OfferingsService,
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
            'Returns paginated offerings with optional relations. Use `relations=user,offers,price,prices` to include joins.',
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
    getOfferingById() {

    }


    @Patch('/:id')
    updateOfferings() {

    }



    @Delete('/:id/soft-delete')
    softDeleteOffering() {

    }



    @Delete('/:id')
    deleteOffering() {

    }
}

