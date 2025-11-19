import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';

@Injectable()
export class UpdateUserProvider {


    constructor(
        /**
         * Injecting Users repository.
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * Updates a user.
     * @param patchUserDto 
     * @returns 
     */
    public async updateUser(patchUserDto: PatchUserDto, user: ActiveUserData): Promise<Partial<User>> {
        const { password, ...rest } = patchUserDto;
        let existingUser = undefined
        // 1. Check if user exists
        try {
            existingUser = await this.userRepository.findOne({ where: { id: user.sub } });
        } catch (error) {
            throw new ConflictException(error)
        }

        if (patchUserDto.id && patchUserDto.id !== user.sub) {
            throw new ForbiddenException('You can only update your own profile.');
        }

        // 2. Handle password update if present
        if (password) {
            existingUser.password = await bcrypt.hash(password, 10);
        }

        // 4. Merge and save
        const updatedUser = this.userRepository.merge(existingUser, rest);

        try {
            const savedUser = await this.userRepository.save(updatedUser);
            const { password, google_id, ...safeUser } = savedUser;
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





    async updateUserIsLoggedIn(id: number): Promise<void> {
        try {
            await this.userRepository.update(id, { is_logged_in: true });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async updateUserIsLoggedOut(id: number): Promise<void> {
        try {
            await this.userRepository.update(id, { is_logged_in: false });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async updateUserGoogleId(id: number, googleId: string): Promise<void> {
        try {
            await this.userRepository.update(id, { google_id: googleId });
        } catch (error) {
            throw new ConflictException(error);
        }
    }
}
