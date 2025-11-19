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
       
        const user = await this.userRepository.findOneBy({ google_id: googleId });
        return user;
    }
}
