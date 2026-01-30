import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UserFaqsService } from './providers/user-faqs.service';
import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';

@ApiTags('User FAQs')
@Controller('user-faqs')
export class UserFaqsController {
    constructor(private readonly userFaqsService: UserFaqsService) {}

    @ApiOperation({ summary: 'Create a new FAQ for the authenticated user' })
    @ApiResponse({ status: 201, description: 'FAQ created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: CreateFaqDto })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Post()
    async createFaq(@Request() req: any, @Body() createFaqDto: CreateFaqDto) {
        const userId = req.user.sub;
        return await this.userFaqsService.createFaq(userId, createFaqDto);
    }

    @ApiOperation({ summary: 'Get all FAQs for the authenticated user' })
    @ApiResponse({ status: 200, description: 'List of FAQs' })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get()
    async getUserFaqs(@Request() req: any) {
        const userId = req.user.sub;
        return await this.userFaqsService.getUserFaqs(userId);
    }

    @ApiOperation({ summary: 'Get FAQs for a specific user (public profile)' })
    @ApiResponse({ status: 200, description: 'List of FAQs for the user' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @Get('user/:userId')
    async getFaqsByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return await this.userFaqsService.getFaqsByUserId(userId);
    }

    @ApiOperation({ summary: 'Get a single FAQ by ID' })
    @ApiResponse({ status: 200, description: 'FAQ details' })
    @ApiResponse({ status: 404, description: 'FAQ not found' })
    @ApiParam({ name: 'id', description: 'FAQ ID' })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get(':id')
    async getFaqById(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        return await this.userFaqsService.getFaqById(id, userId);
    }

    @ApiOperation({ summary: 'Update an FAQ' })
    @ApiResponse({ status: 200, description: 'FAQ updated successfully' })
    @ApiResponse({ status: 404, description: 'FAQ not found' })
    @ApiParam({ name: 'id', description: 'FAQ ID' })
    @ApiBody({ type: UpdateFaqDto })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Put(':id')
    async updateFaq(
        @Request() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFaqDto: UpdateFaqDto,
    ) {
        const userId = req.user.sub;
        return await this.userFaqsService.updateFaq(id, userId, updateFaqDto);
    }

    @ApiOperation({ summary: 'Delete an FAQ' })
    @ApiResponse({ status: 200, description: 'FAQ deleted successfully' })
    @ApiResponse({ status: 404, description: 'FAQ not found' })
    @ApiParam({ name: 'id', description: 'FAQ ID' })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async deleteFaq(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        await this.userFaqsService.deleteFaq(id, userId);
        return { message: 'FAQ deleted successfully' };
    }
}

