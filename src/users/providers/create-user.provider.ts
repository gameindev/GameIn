import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/post-create-user.dto';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfilesService } from 'src/creator-profiles/providers/creator-profiles.service';
import { BrandProfilesService } from 'src/brand-profiles/providers/brand-profiles.service';
import { UserType } from '../enums/user-type.enums';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersBioService } from 'src/users-bio/providers/users-bio.service';

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

        /**
         * Injecting Datasource.
         */
        private readonly dataSource: DataSource,
    ) { }


    public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { password, ...rest } = createUserDto;
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect();

        const hashedPassword = await this.hashingProvider.hashPassword(password);

        await queryRunner.startTransaction()

        const newUser = queryRunner.manager.create(User, {
            ...rest,
            password: hashedPassword,
        })

        try {
            const savedUser = await queryRunner.manager.save(User, newUser);

            if (savedUser.userType === UserType.CREATOR) {
                await this.creatorProfileService.createProfileForUser(savedUser, queryRunner);
            } else if (savedUser.userType === UserType.BRAND) {
                await this.brandProfileService.createProfileForUser(savedUser, queryRunner);
            }

            await queryRunner.commitTransaction();

            return savedUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
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
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Creates a user.
     * @param createUserDto 
     * @returns 
     */
    // public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    //     const { password, ...rest } = createUserDto;
    //     const hashedPassword = await this.hashingProvider.hashPassword(password);

    //     const newUser = this.userRepository.create({
    //         ...rest,
    //         password: hashedPassword,
    //     });


    //     try {
    //         const savedUser = await this.userRepository.save(newUser);

    //         await this.userBioService.createUserBio(savedUser);

    //         if (savedUser.userType === UserType.CREATOR) {
    //             await this.creatorProfileService.createProfileForUser(savedUser);
    //         } else if (savedUser.userType === UserType.BRAND) {
    //             await this.brandProfileService.createProfileForUser(savedUser);
    //         }

    //         return savedUser
    //     } catch (error) {
    //         // PostgreSQL unique constraint violation code
    //         if (error.code === '23505') {
    //             const detail = error.detail;

    //             if (detail.includes('username')) {
    //                 throw new BadRequestException('Username is already taken');
    //             } else if (detail.includes('email')) {
    //                 throw new BadRequestException('Email is already registered');
    //             }

    //             // fallback
    //             throw new BadRequestException('User already exists');
    //         }

    //         throw new InternalServerErrorException('Failed to create user');
    //     }
    // }
}
