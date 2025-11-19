import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * Inject the UserRepository.
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    public async findOneByGoogleId(googleId: string): Promise<User> {
        console.log('Searching for user with google_id:', googleId, 'Type:', typeof googleId);
        const user = await this.userRepository.findOneBy({ google_id: googleId });
        console.log('Query result:', user ? `Found user ID: ${user.id}` : 'No user found');
        return user;
    }
}
