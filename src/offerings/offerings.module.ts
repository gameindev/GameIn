import { forwardRef, Module } from '@nestjs/common';
import { OfferingsController } from './offerings.controller';
import { OfferingsService } from './providers/offerings.service';
import { OfferingOffersModule } from './offering-offers/offering-offers.module';
import { OfferingPriceModule } from './offering-price/offering-price.module';
import { OfferingOffersService } from './offering-offers/providers/offering-offers.service';
import { OfferingPriceService } from './offering-price/providers/offering-price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offering } from './offerings.entity';
import { OfferingOffers } from './offering-offers/offering-offers.entity';
import { OfferingPrice } from './offering-price/offering-price.entity';
import { OfferingBaseService } from './providers/offering.base.service';
import { OfferingsScheduler } from './scheduler/offerings.scheduler';
import { CreateAdjustmentProvider } from './providers/create-adjustment.provider';
import { UsersModule } from '../users/users.module';
import { UploadsModule } from '../uploads/uploads.module';
import { ChatModule } from '@/chat/chat.module';
import { OfferingsOrderModule } from '@/offerings-order/offerings-order.module';

@Module({
    controllers: [OfferingsController],
    providers: [
        OfferingsService, 
        OfferingOffersService, 
        OfferingPriceService, 
        OfferingBaseService, 
        OfferingsScheduler,
        CreateAdjustmentProvider,
    ],
    imports: [
        TypeOrmModule.forFeature([Offering, OfferingOffers, OfferingPrice]),
        forwardRef(() => OfferingOffersModule),
        UsersModule,
        forwardRef(() => OfferingPriceModule),
        UploadsModule,
        ChatModule,
        OfferingsOrderModule,
    ], 
    exports: [OfferingsService, OfferingBaseService],
})
export class OfferingsModule { }
