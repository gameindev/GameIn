/* eslint-disable */
import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/post-create-user.dto';
import * as bcrypt from 'bcrypt';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { CreatorProfilesService } from 'src/creator-profiles/providers/creator-profiles.service';
import { UserType } from '../enums/user-type.enums';
import { BrandProfilesService } from 'src/brand-profiles/providers/brand-profiles.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { UpdateUserProvider } from './update-user.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FindOneByIdentifierProvider } from './find-one-by-identifier.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.intefrace';
import { PathcUserRoleDto } from '../dtos/patch-user-role.dto';
import { UpdateUserRoleProvider } from './update-user-role.provider';
import { CheckOneByIdentifierProvider } from './check-one-by-identifier.provider';

/**
 * Users service.
 */
@Injectable()
export class UsersService {
    constructor(
        private readonly dataSource: DataSource,
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
         * Injecting createUserProvider.
         */
        @Inject(CreateUserProvider)
        private readonly createUserProvider: CreateUserProvider,

        /**
         * Injecting findOneUserByEmailProvider.
         */
        @Inject(FindOneUserByEmailProvider)
        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

        /**
         * Injecting FindOneByIdentifierProvider.
         */
        private readonly findOneUserByIdentifier: FindOneByIdentifierProvider,
        /**
         * Injecting UpdateUserProvider.
         */

        // @Inject(profileConfig.KEY)
        // private readonly profileConfiguration: ConfigType<typeof profileConfig>,

        /**
         * Inject UpdateUserProvider.
         */
        private readonly updateUserProvider: UpdateUserProvider,

        /**
         * Injecting FindOneByGoogleIdProvider.
         */
        @Inject(FindOneByGoogleIdProvider)
        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

        /**
         * Injecting CreateGoogleUserProvider.
         */
        @Inject(CreateGoogleUserProvider)
        private readonly createGoogleUserProvider: CreateGoogleUserProvider,

        /**
         * Injectting UpdateUserRoleProvider
         */
        @Inject(UpdateUserRoleProvider)
        private readonly updateUserRoleProvider: UpdateUserRoleProvider,

        /**
         * Injectting UpdateUserRoleProvider
         */
        @Inject(CheckOneByIdentifierProvider)
        private readonly checkOneByIdentifierProvider: CheckOneByIdentifierProvider,
    ) { }


    /**
     * Get all users. Populate relations if needed.
     * @param limit 
     * @param page 
     * @param populate 
     * @returns 
     */
    public async getAllUsers(
        limit: number,
        page: number,
        populate?: string,
    ): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            // Step 1: Validate and prepare requested relations
            const userMetadata = this.dataSource.getMetadata(User);
            const validRelations = userMetadata.relations.map((r) => r.propertyName);

            const relations: string[] = [];

            if (populate) {
                const values = populate.split(',').map((v) => v.trim());

                if (values.includes('*')) {
                    relations.push(...validRelations);
                } else {
                    for (const value of values) {
                        if (validRelations.includes(value)) {
                            relations.push(value);
                        } else {
                            throw new BadRequestException(
                                `Invalid relation requested: "${value}"`,
                            );
                        }
                    }
                }
            }

            // Step 2: Query paginated users with selected relations
            const [users, total] = await this.userRepository.findAndCount({
                relations,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    userType: true,
                    isActive: true,
                    isVerified: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                order: {
                    createdAt: 'DESC',
                },
            });

            return {
                data: users,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            // If the error is known (e.g. BadRequestException), re-throw
            if (error instanceof BadRequestException) {
                throw error;
            }

            // Otherwise, return a generic server error
            throw new InternalServerErrorException('Failed to fetch users');
        }
    }

    /**
     * Get user by ID. Populate relations if needed.
     * @param id
     * @param populate
     * @returns
     */
    public async getUserById(id: number, populate?: string): Promise<User | null> {
        const userMetadata = this.dataSource.getMetadata(User);
        const validRelations = userMetadata.relations.map((r) => r.propertyName);

        const relations: string[] = [];

        if (populate) {
            const values = populate.split(',').map((v) => v.trim());

            if (values.includes('*')) {
                relations.push(...validRelations);
            } else {
                for (const value of values) {
                    if (validRelations.includes(value)) {
                        relations.push(value);
                    }
                }
            }
        }


        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations,
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return user;
        } catch (error) {
            // Don't overwrite known HTTP exceptions like NotFoundException
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to retrieve user');
        }
    }


    /**
     * Creates a user.
     * @param createUserDto 
     * @returns 
     */
    public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
        return this.createUserProvider.createUser(createUserDto); 
    }


    /**
     * Updates a user.
     * @param patchUserDto 
     * @returns 
     */
    public async updateUser(patchUserDto: PatchUserDto, user: ActiveUserData): Promise<Partial<User>> {
        return await this.updateUserProvider.updateUser(patchUserDto, user);
    }


    /**
     * Deletes a user.
     * @param id 
     * @returns 
     */
    public async deleteUser(id: number) {
        // 1. Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        try {
            // 2. Delete user
            await this.userRepository.delete(id);
            // 3. Return success message
            return { message: 'User deleted successfully', id };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete user');
        }
    }

    /**
     * Soft deletes a user.
     * @param id 
     * @returns 
     */
    public async softDeleteUser(id: number) {
        // 1. Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        try {
            // 2. Soft delete user
            await this.userRepository.softDelete(id);
            // 3. Return success message
            return { message: 'User soft deleted successfully', id };
        } catch (error) {
            throw new InternalServerErrorException('Failed to soft delete user');
        }
    }

    public async findUserOneByEmail(email: string) {
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }

    public async findOneByIdentifier(identifier: string) {
        return await this.findOneUserByIdentifier.findOneByIdentifier(identifier);
    }


    public async checkOneByIdentifier(identifier: string) {
        return await this.checkOneByIdentifierProvider.checkOneByIdentifier(identifier);
    }


    public async findOneByGoogleId(googleId: string) {
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }


    public async createGoogleUser(googleUser: GoogleUser) {
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }

    public async updateOAuthUserRole(patchUserRoleDto: PathcUserRoleDto, userSub: ActiveUserData) {
        return await this.updateUserRoleProvider.updateOAuthUserRole(patchUserRoleDto, userSub);
    }
}
