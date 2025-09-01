import { Body, Controller, Delete, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { OfferingsService } from './providers/offerings.service';
import { CreateOfferingDto } from './dtos/post-offering.dto';
import { CreateOfferingBundleDto } from './dtos/post-offering-bundle.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';
import { UserType } from 'src/users/enums/user-type.enums';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

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
    @ApiBody({ type: CreateOfferingDto })
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.CREATOR)
    createOffering(
        @ActiveUser() user: ActiveUserData,
        @Body() createOfferingDto: CreateOfferingDto
    ) {
        return this.offeringService.createOffering(createOfferingDto, user);
    }


    @Get()
    getOfferings() {

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

