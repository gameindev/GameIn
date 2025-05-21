/* eslint-disable */
import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

        // @Inject(profileConfig.KEY)
        // private readonly profileConfiguration: ConfigType<typeof profileConfig>,
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
    public async updateUser(patchUserDto: PatchUserDto): Promise<Partial<User>> {
        const { id, password, ...rest } = patchUserDto;

        // 1. Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }


        // 2. Handle password update if present
        if (password) {
            existingUser.password = await bcrypt.hash(password, 10);
        }

        // 4. Merge and save
        const updatedUser = this.userRepository.merge(existingUser, rest);

        try {
            const savedUser = await this.userRepository.save(updatedUser);
            const { password, ...safeUser } = savedUser;
            return safeUser;
        } catch (error) {
            if (error.code === '23505') {
                const detail = error.detail;
                if (detail.includes('username')) {
                    throw new BadRequestException('Username already exists');
                }
                if (detail.includes('email')) {
                    throw new BadRequestException('Email already exists');
                }
            }

            throw new InternalServerErrorException('Update failed');
        }
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

}
