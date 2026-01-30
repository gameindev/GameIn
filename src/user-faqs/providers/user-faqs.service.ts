import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFaq } from '../user-faq.entity';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';

@Injectable()
export class UserFaqsService {
    constructor(
        @InjectRepository(UserFaq)
        private readonly faqRepository: Repository<UserFaq>,
    ) {}

    /**
     * Create a new FAQ for the authenticated user
     */
    async createFaq(userId: number, createFaqDto: CreateFaqDto): Promise<UserFaq> {
        try {
            const faq = this.faqRepository.create({
                user: { id: userId } as any,
                question: createFaqDto.question,
                answer: createFaqDto.answer,
                order: createFaqDto.order ?? 0,
            });

            return await this.faqRepository.save(faq);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create FAQ');
        }
    }

    /**
     * Get all FAQs for a user
     */
    async getUserFaqs(userId: number): Promise<UserFaq[]> {
        return await this.faqRepository.find({
            where: { user: { id: userId } },
            order: { order: 'ASC', created_at: 'ASC' },
        });
    }

    /**
     * Get a single FAQ by ID (only if it belongs to the user)
     */
    async getFaqById(faqId: number, userId: number): Promise<UserFaq> {
        const faq = await this.faqRepository.findOne({
            where: { id: faqId, user: { id: userId } },
        });

        if (!faq) {
            throw new NotFoundException('FAQ not found');
        }

        return faq;
    }

    /**
     * Update an FAQ (only if it belongs to the user)
     */
    async updateFaq(faqId: number, userId: number, updateFaqDto: UpdateFaqDto): Promise<UserFaq> {
        const faq = await this.getFaqById(faqId, userId);

        Object.assign(faq, updateFaqDto);

        try {
            return await this.faqRepository.save(faq);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update FAQ');
        }
    }

    /**
     * Delete an FAQ (only if it belongs to the user)
     */
    async deleteFaq(faqId: number, userId: number): Promise<void> {
        const faq = await this.getFaqById(faqId, userId);

        try {
            await this.faqRepository.remove(faq);
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete FAQ');
        }
    }

    /**
     * Get FAQs for a specific user (public endpoint - for viewing other users' profiles)
     */
    async getFaqsByUserId(userId: number): Promise<UserFaq[]> {
        return await this.faqRepository.find({
            where: { user: { id: userId } },
            order: { order: 'ASC', created_at: 'ASC' },
        });
    }
}

