import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { PathcUserRoleDto } from '../dtos/patch-user-role.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersBioService } from 'src/users-bio/providers/users-bio.service';
import { UserType } from 'src/users/enums/user-type.enums';

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

        /**
         * Injecting UserBioService
         */
        @Inject(UsersBioService)
        private readonly userBioService: UsersBioService,
    ) { }


    async updateOAuthUserRole(patchUserRoleDto: PathcUserRoleDto, userSub: ActiveUserData) {
        const { password, userType } = patchUserRoleDto;
        let user = undefined;

        const hashedPassword = await this.hashingProvider.hashPassword(password);

        try {
            user = await this.userRepository.findOneBy({ id: userSub.sub });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching user');
        }

        if (!user) {
            throw new BadRequestException('User not found');
        }

        try {
            if (user.userType === null) {
                user.userType = userType;
            }
            user.password = hashedPassword;
            await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Something went wrong while updating this user');
        }

        if(user.userBio === null) {
            await this.userBioService.createUserBio(user);
        }

        return user
    }
}
