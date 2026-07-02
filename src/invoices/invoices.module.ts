import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './providers/invoices.service';
import { Invoice } from './invoice.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice]),
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService], // Export so PaymentsModule can use it
})
export class InvoicesModule {}

