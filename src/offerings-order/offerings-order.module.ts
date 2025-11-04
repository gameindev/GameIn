import { forwardRef, Module } from '@nestjs/common';
import { OfferingsOrderController } from './offerings-order.controller';
import { OfferingsOrderService } from './providers/offerings-order.service';
import { UsersModule } from '@/users/users.module';
import { OfferingsModule } from '@/offerings/offerings.module';
import { OfferingOrder } from './offering-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostOfferingOrderProvider } from './providers/post-offering-order.provider';
import { GetOfferingOrderProvider } from './providers/get-offering-order.provider';

@Module({
    controllers: [OfferingsOrderController],
    providers: [OfferingsOrderService, PostOfferingOrderProvider, GetOfferingOrderProvider],
    exports: [OfferingsOrderService],
    imports: [
        TypeOrmModule.forFeature([OfferingOrder]),
        UsersModule,
        forwardRef(() => OfferingsModule)
    ]

})
export class OfferingsOrderModule { }
