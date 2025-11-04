import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserSearchDto } from '../dtos/user-search.dto';
import { User } from '../../users/user.entity';

@Injectable()
export class UserSearchService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async searchUsers(dto: UserSearchDto) {
        const { keyword, user_type, country, page = 1, limit = 20 } = dto;

        // Build the base query with all necessary joins
        let query = this.userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.creator_profile', 'creator')
            .leftJoinAndSelect('users.brand_profile', 'brand')
            .leftJoinAndSelect('creator.profile_image', 'creator_profile_image')
            .leftJoinAndSelect('creator.cover_image', 'creator_cover_image')
            .leftJoinAndSelect('brand.profile_image', 'brand_profile_image')
            .leftJoinAndSelect('brand.cover_image', 'brand_cover_image')
            .where('users.is_active = true');

        // Apply user type filter
        if (user_type) {
            query = query.andWhere('users.user_type = :user_type', { user_type });
        }

        // Apply keyword search across multiple fields
        if (keyword) {
            const searchPattern = `%${keyword}%`;
            query = query.andWhere(new Brackets(qb => {
                qb.where('users.username ILIKE :keyword', { keyword: searchPattern })
                    .orWhere('users.email ILIKE :keyword', { keyword: searchPattern })
                    .orWhere('creator.first_name ILIKE :keyword', { keyword: searchPattern })
                    .orWhere('creator.last_name ILIKE :keyword', { keyword: searchPattern })
                    .orWhere('brand.brand_name ILIKE :keyword', { keyword: searchPattern })
                    .orWhere('brand.head_office ILIKE :keyword', { keyword: searchPattern });
            }));
        }

        // Apply country filter
        if (country) {
            const countryPattern = `%${country}%`;
            query = query.andWhere(new Brackets(qb => {
                qb.where('creator.country ILIKE :country', { country: countryPattern })
                    .orWhere('brand.head_office ILIKE :country', { country: countryPattern })
                    .orWhere('brand.country ILIKE :country', { country: countryPattern });
            }));
        }

        // Apply pagination
        const offset = (page - 1) * limit;
        query = query.skip(offset).take(limit);

        // Execute query and get results
        const [results, total] = await query.getManyAndCount();

        return {
            results,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPreviousPage: page > 1
        };
    }
}
