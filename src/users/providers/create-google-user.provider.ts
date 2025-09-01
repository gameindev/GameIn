import { ConflictException, Inject, Injectable } from '@nestjs/common';
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
                google_id: googleUser.google_id,
                email: googleUser.email,
                username: googleUser.given_name,
                user_type: null
            });
           
            
           const savedUser =  await this.usersRepository.save(user);          
           
           console.log(savedUser)
           return savedUser;
           
       } catch (error) {
           throw new ConflictException(error, {
                description: 'Could not create new user',
            })
       }
    }
}
