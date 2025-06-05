import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/post-create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfilesService } from 'src/creator-profiles/providers/creator-profiles.service';
import { BrandProfilesService } from 'src/brand-profiles/providers/brand-profiles.service';
import { UserType } from '../enums/user-type.enums';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {

    constructor(
        /**
         * Injecting User Repository.
         */
        @InjectRepository(User)
        private userRepository: Repository<User>,

        /**
         * Inject CreatorProfileService.
         */
        @Inject(CreatorProfilesService)
        private readonly creatorProfileService: CreatorProfilesService,

        /**
         * Inject BrandProfilesService.
         */
        @Inject(BrandProfilesService)
        private readonly brandProfileService: BrandProfilesService,

        /**
         * Injecting HashingProvider.
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ){}

    /**
     * Creates a user.
     * @param createUserDto 
     * @returns 
     */
    public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await this.hashingProvider.hashPassword(password);

        const newUser = this.userRepository.create({
            ...rest,
            password: hashedPassword,
        });


        try {
            const savedUser = await this.userRepository.save(newUser);
            if (savedUser.userType === UserType.CREATOR) {
                await this.creatorProfileService.createProfileForUser(savedUser);
            } else if (savedUser.userType === UserType.BRAND) {
                await this.brandProfileService.createProfileForUser(savedUser);
            }

            return savedUser
        } catch (error) {
            // PostgreSQL unique constraint violation code
            if (error.code === '23505') {
                const detail = error.detail;

                if (detail.includes('username')) {
                    throw new BadRequestException('Username is already taken');
                } else if (detail.includes('email')) {
                    throw new BadRequestException('Email is already registered');
                }

                // fallback
                throw new BadRequestException('User already exists');
            }

            throw new InternalServerErrorException('Failed to create user');
        }
    }
}
