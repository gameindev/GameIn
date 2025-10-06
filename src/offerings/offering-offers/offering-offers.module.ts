import { forwardRef, Module } from '@nestjs/common';
import { OfferingOffersController } from './offering-offers.controller';
import { OfferingOffersService } from './providers/offering-offers.service';
import { OfferingOffers } from './offering-offers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingsModule } from '../offerings.module';
import { UsersModule } from '@/users/users.module';

@Module({
    controllers: [OfferingOffersController],
    providers: [OfferingOffersService],
    exports: [OfferingOffersService],
    imports: [
        TypeOrmModule.forFeature([OfferingOffers]),
        forwardRef(() => OfferingsModule),
        UsersModule
    ]
})
export class OfferingOffersModule { }
