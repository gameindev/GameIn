import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './providers/invoices.service';
import { Invoice } from './invoice.entity';
import { OfferingsOrderModule } from '../offerings-order/offerings-order.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice]),
        OfferingsOrderModule,
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService], // Export so PaymentsModule can use it
})
export class InvoicesModule {}

