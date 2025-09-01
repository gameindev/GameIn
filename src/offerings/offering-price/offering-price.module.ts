import { Module } from '@nestjs/common';
import { OfferingPriceController } from './offering-price.controller';
import { OfferingPriceService } from './providers/offering-price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingPrice } from './offering-price.entity';

@Module({
    controllers: [OfferingPriceController],
    providers: [OfferingPriceService],
    exports: [OfferingPriceService],
    imports: [
        TypeOrmModule.forFeature([OfferingPrice]),
    ]
})
export class OfferingPriceModule { }
