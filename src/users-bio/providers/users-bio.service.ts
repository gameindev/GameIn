import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserBio } from '../user-bio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBioDto } from '../dtos/create-bio.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsersBioService {

    constructor(
        /**
         * Injecting UserBio Repository.
         */
        @InjectRepository(UserBio)
        private readonly userBioRepository: Repository<UserBio>,
    ) {}

    public async createUserBio(User: User): Promise<any> {
        
        try {
            const bio = await this.userBioRepository.create({
                user: User,
            });
            return await this.userBioRepository.save(bio);
        } catch (error) {
            if (error.code === '23505') { // Duplicate entry error
                throw new ConflictException('Bio already exists for this user');
            }
            throw new InternalServerErrorException('Failed to create user bio');
        }
    }
}
