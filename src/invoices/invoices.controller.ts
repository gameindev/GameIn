import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './providers/invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new invoice' })
    @ApiResponse({ status: 201, description: 'Invoice created successfully' })
    async create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get invoice by ID' })
    @ApiParam({ name: 'id', description: 'Invoice ID' })
    @ApiResponse({ status: 200, description: 'Invoice retrieved successfully' })
    async findOne(@Param('id') id: number) {
        return this.invoicesService.findOne(id, ['order']);
    }

    @Get('order/:orderId')
    @ApiOperation({ summary: 'Get invoice by order ID' })
    @ApiParam({ name: 'orderId', description: 'Order ID' })
    @ApiResponse({ status: 200, description: 'Invoice retrieved successfully' })
    async findByOrderId(@Param('orderId') orderId: number) {
        return this.invoicesService.findByOrderId(orderId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update invoice' })
    @ApiParam({ name: 'id', description: 'Invoice ID' })
    @ApiResponse({ status: 200, description: 'Invoice updated successfully' })
    async update(@Param('id') id: number, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoicesService.update(id, updateInvoiceDto);
    }

    @Patch(':id/paid')
    @ApiOperation({ summary: 'Mark invoice as paid' })
    @ApiParam({ name: 'id', description: 'Invoice ID' })
    @ApiResponse({ status: 200, description: 'Invoice marked as paid' })
    async markAsPaid(@Param('id') id: number) {
        return this.invoicesService.markAsPaid(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete invoice' })
    @ApiParam({ name: 'id', description: 'Invoice ID' })
    @ApiResponse({ status: 200, description: 'Invoice deleted successfully' })
    async remove(@Param('id') id: number) {
        await this.invoicesService.remove(id);
        return { message: 'Invoice deleted successfully' };
    }
}

