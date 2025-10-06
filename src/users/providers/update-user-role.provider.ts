import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { PathcUserRoleDto } from '../dtos/patch-user-role.dto';
import { ActiveUserData } from '@/auth/interfaces/active-user-data.interface';
import { HashingProvider } from '@/auth/providers/hashing.provider';
import { UsersBioService } from '@/users-bio/providers/users-bio.service';
import { UserType } from '@/users/enums/user-type.enums';
import { CreatorProfilesService } from '@/creator-profiles/providers/creator-profiles.service';
import { BrandProfilesService } from '@/brand-profiles/providers/brand-profiles.service';
import { GenerateTokensProvider } from '@/auth/providers/generate-tokens.provider';
import { access } from 'fs';

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

        private readonly creatorProfileService: CreatorProfilesService,
        private readonly brandProfileService: BrandProfilesService,
        private readonly generateTokensProvider: GenerateTokensProvider,
        /**
         * Injecting Datasource.
         */
        private readonly dataSource: DataSource,
    ) { }


    async updateOAuthUserRole(patchUserRoleDto: PathcUserRoleDto, userSub: ActiveUserData) {
        const { password, user_type } = patchUserRoleDto;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await queryRunner.manager.findOneBy(User, { id: userSub.sub });

            if (!user) {
                throw new BadRequestException('User not found');
            }

            let tokens = undefined;

            // Only update userType if null
            if (user.user_type === null) {
                user.user_type = user_type;

                if (user_type === UserType.CREATOR) {
                    await this.creatorProfileService.createProfileForUser(user, queryRunner);
                } else if (user_type === UserType.BRAND) {
                    await this.brandProfileService.createProfileForUser(user, queryRunner);
                }

                tokens = await this.generateTokensProvider.generateTokens(user);
            }

            user.password = await this.hashingProvider.hashPassword(password);
            await queryRunner.manager.save(User, user);

            await queryRunner.commitTransaction();

            // Separate: userBio is optional, and safely done outside transaction
            // if (user.userBio === null) {
            //     await this.userBioService.createUserBio(user); // If this needs to be transactional too, move it above
            // }

            return {
                user: {
                    id: user.id,
                    user_type: user.user_type,
                },
                accessToken: tokens?.accessToken,
                refreshToken: tokens?.refreshToken,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();

            if (error instanceof BadRequestException) {
                throw error;
            }

            console.error('updateOAuthUserRole error:', error);
            throw new InternalServerErrorException('Something went wrong while updating this user');
        } finally {
            await queryRunner.release();
        }
    }

}
