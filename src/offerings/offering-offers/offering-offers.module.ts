import { Module } from '@nestjs/common';
import { OfferingOffersController } from './offering-offers.controller';
import { OfferingOffersService } from './providers/offering-offers.service';
import { OfferingOffers } from './offering-offers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [OfferingOffersController],
    providers: [OfferingOffersService],
    exports: [OfferingOffersService],
    imports: [
        TypeOrmModule.forFeature([OfferingOffers]),
    ]
})
export class OfferingOffersModule { }
