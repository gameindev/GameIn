import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { PathcUserRoleDto } from '../dtos/patch-user-role.dto';

@Injectable()
export class UpdateUserRoleProvider {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async updateOAuthUserRole(patchUserRoleDto: PathcUserRoleDto) {
        let user = undefined;

        try {
            user = await this.userRepository.findOneBy({ googleId: patchUserRoleDto.googleId });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while fetching user');
        }

        if (!user) {
            throw new BadRequestException('User not found');
        }

        try {
            user.userType = patchUserRoleDto.userType;
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong while updating user');
        }

        return user;
    }
}
