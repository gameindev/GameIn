import { BadRequestException, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByIdentifierProvider {
    constructor(
        /**
         * Injecting User Repository.
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    public async findOneByIdentifier(identifier: string) {
        if (!identifier) throw new BadRequestException('Missing identifier');

        let user: User | undefined = undefined;

        try {

            if (identifier.includes('@')) {
                user = await this.userRepository.findOneBy({ email: identifier });
            } else {
                user = await this.userRepository.findOneBy({ username: identifier });
            }

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not fetch the user.',
            });
        }

        if (!user) {
            throw new BadRequestException('User does not exist.');
        }

        return user;
    }

}
