import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { PathcUserRoleDto } from '../dtos/patch-user-role.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UpdateUserRoleProvider {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        /**
         * Injecting HashingProvider.
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) { }


    async updateOAuthUserRole(patchUserRoleDto: PathcUserRoleDto, userSub: ActiveUserData) {
        const { password, userType } = patchUserRoleDto;
        let user = undefined;

        const hashedPassword = await this.hashingProvider.hashPassword(password);

        try {
            user = await this.userRepository.findOneBy({ id: userSub.sub  });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching user');
        }

        if (!user) {
            throw new BadRequestException('User not found');
        }

        try {
            user.userType = userType;
            user.password = hashedPassword;
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while updating user');
        }

        return {
            "username": user.username,
            "email": user.email,
            "userType": user.userType,
            "dateOfBirth": user.dateOfBirth,
            "isActive": user.isActive,
            "isVerified": user.isVerified,
            "isFirst": user.isFirst,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt,
            "deletedAt": user.deletedAt
          }
    }
}
