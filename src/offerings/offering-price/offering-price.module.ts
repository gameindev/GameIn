import { forwardRef, Module } from '@nestjs/common';
import { OfferingPriceController } from './offering-price.controller';
import { OfferingPriceService } from './providers/offering-price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingPrice } from './offering-price.entity';
import { OfferingsModule } from '../offerings.module';
import { OfferingsOrderModule } from '@/offerings-order/offerings-order.module';

@Module({
    controllers: [OfferingPriceController],
    providers: [OfferingPriceService],
    exports: [OfferingPriceService],
    imports: [
        TypeOrmModule.forFeature([OfferingPrice]),
        forwardRef(() => OfferingsModule),
        forwardRef(() => OfferingsOrderModule),
    ]
})
export class OfferingPriceModule { }
