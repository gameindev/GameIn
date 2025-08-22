import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Brackets, Repository } from 'typeorm';
import { UserSearchDto } from '../dtos/user-search.dto';

@Injectable()
export class UserSearchService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async searchUsers(dto: UserSearchDto) {
        const { keyword, userType, country, page, limit } = dto;

        let query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.creatorProfile', 'creator')
            .leftJoinAndSelect('user.brandProfile', 'brand')
            .where('user.isActive = true');
        console.log(query);

        if (userType) {
            query = query.andWhere('user.userType = :userType', { userType });
        }

        if (keyword) {
            query = query.andWhere(new Brackets(qb => {
                qb.where('user.username ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('user.email ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('creator.firstName ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('creator.lastName ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('brand.brandName ILIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('brand.headOffice ILIKE :keyword', { keyword: `%${keyword}%` });
            }));
        }

        if (country) {
            query = query.andWhere(new Brackets(qb => {
                qb.where('creator.country ILIKE :country', { country: `%${country}%` })
                    .orWhere('brand.headOffice ILIKE :country', { country: `%${country}%` });
            }));
        }

        query = query.skip((page - 1) * limit).take(limit);

        const [results, total] = await query.getManyAndCount();
        return { results, total, page, limit };
    }
}
