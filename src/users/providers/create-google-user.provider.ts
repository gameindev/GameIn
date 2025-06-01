import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from '../interfaces/google-user.intefrace';

@Injectable()
export class CreateGoogleUserProvider {

    constructor(
        /**
         * Injecting UserRepository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    public async createGoogleUser(googleUser: GoogleUser){
       try {
            const user = this.usersRepository.create({
                googleId: googleUser.googleId,
                email: googleUser.email,
                username: googleUser.given_name,
                userType: null
            });

            return await this.usersRepository.save(user);
       } catch (error) {
           throw new ConflictException(error, {
                description: 'Could not create new user',
            })
       }
    }
}
