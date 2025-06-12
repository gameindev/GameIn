import { BadRequestException, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        /**
         * Injecting User Repository.
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    public async findOneByEmail(email: string) {
        if (!email) throw new BadRequestException('Missing email');

        let user: User | undefined = undefined;
        // null if user is not found
        try {
            user = await this.userRepository.findOneBy({
                email: email,
            });
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not fetch the user.',
            })
        }

        if (!user) {
            throw new BadRequestException('User does not exist.')
        }
        return user;
    }
}
