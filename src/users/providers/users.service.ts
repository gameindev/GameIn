/* eslint-disable */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/post-create-user.dto';
import * as bcrypt from 'bcrypt';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { CreatorProfilesService } from 'src/creator-profiles/providers/creator-profiles.service';
import { UserType } from '../enums/user-type.enums';
import { BrandProfilesService } from 'src/brand-profiles/providers/brand-profiles.service';

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
    public async getAllUsers(limit: number, page: number, populate?: string) {
        const userMetadata = this.dataSource.getMetadata(User);
        console.log(userMetadata.relations);
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

        return this.userRepository.findOne({
            where: { id },
            relations,
        });
    }


    /**
     * Creates a user.
     * @param createUserDto 
     * @returns 
     */
    public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            ...rest,
            password: hashedPassword,
        });


        try {
            const savedUser = await this.userRepository.save(newUser);
            if (savedUser.userType === UserType.CREATOR) {
                await this.creatorProfileService.createProfileForUser(savedUser);
            } else if(savedUser.userType === UserType.BRAND) {
                await this.brandProfileService.createProfileForUser(savedUser);
            }

            return {
                id: savedUser.id,
                username: savedUser.username,
                email: savedUser.email,
                userType: savedUser.userType,
                isActive: savedUser.isActive,
                isVerified: savedUser.isVerified,
                creatorProfile: savedUser.creatorProfile,
                createdAt: savedUser.createdAt,
            };
        } catch (error) {
            // PostgreSQL unique constraint violation code
            if (error.code === '23505') {
                const detail = error.detail;

                if (detail.includes('username')) {
                    throw new ConflictException('Username is already taken');
                } else if (detail.includes('email')) {
                    throw new ConflictException('Email is already registered');
                }

                // fallback
                throw new ConflictException('User already exists');
            }

            throw new InternalServerErrorException('Failed to create user');
        }
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
                    throw new ConflictException('Username already exists');
                }
                if (detail.includes('email')) {
                    throw new ConflictException('Email already exists');
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
        // 2. Delete user
        await this.userRepository.delete(id);
        // 3. Return success message
        return { message: 'User deleted successfully', id };
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
        // 2. Soft delete user
        await this.userRepository.softDelete(id);
        // 3. Return success message
        return { message: 'User deleted successfully', id };
    }

}
