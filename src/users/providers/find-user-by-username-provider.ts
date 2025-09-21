import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByUsernameProvider {

    constructor(
        /**
         * Injecting User Repository.
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    public async findUserByUsername(username: string): Promise<User | undefined> {
        if (!username) throw new BadRequestException('Missing username');

        let user: User | undefined = undefined;

        try {
            user = await this.userRepository.findOneBy({ username });
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not fetch the user.',
            });
        }

        return user;
    }

    

}
