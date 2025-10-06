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
        const { keyword, user_type, country, page, limit } = dto;

        let query = this.userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.creator_profile', 'creator')
            .leftJoinAndSelect('users.brand_profile', 'brand')
            .where('users.is_active = true');

        if (user_type) {
            query = query.andWhere('users.user_type = :user_type', { user_type: user_type });
        }

        if (keyword) {
            query = query.andWhere(new Brackets(qb => {
                qb.where('users.username ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('users.email ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('creator.first_name ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('creator.last_name ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('brand.brand_name ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('brand.head_office ILIKE :keyword', { keyword: `%${keyword}%` });
            }));
        }

        if (country) {
            query = query.andWhere(new Brackets(qb => {
                qb.where('creator.country ILIKE :country', { country: `%${country}%` })
                    .orWhere('brand.head_office ILIKE :country', { country: `%${country}%` })
                    .orWhere('brand.country ILIKE :country', { country: `%${country}%` })
                    .orWhere('user.country ILIKE :country', { country: `%${country}%` });
            }));
        }

        query = query.skip((page - 1) * limit).take(limit);

        const [results, total] = await query.getManyAndCount();
        return { results, total, page, limit };
    }
}
