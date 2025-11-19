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

    public async createGoogleUser(googleUser: GoogleUser) {
        try {
            const user = this.usersRepository.create({
                google_id: googleUser.google_id,
                email: googleUser.email,
                username: googleUser.given_name,
                user_type: null,
                is_verified: true
            });


            const savedUser = await this.usersRepository.save(user);

            console.log(savedUser)
            return savedUser;

        } catch (error) {
            // If it's a unique constraint violation, provide more context
            if (error?.code === '23505') { // PostgreSQL unique violation
                // Check the error detail to determine which field caused the violation
                const detail = error?.detail || '';
                let field = 'field';
                if (detail.includes('email')) {
                    field = 'email';
                } else if (detail.includes('username')) {
                    field = 'username';
                } else if (detail.includes('google_id')) {
                    field = 'google_id';
                }

                throw new ConflictException(
                    `User with this ${field} already exists`,
                    {
                        description: 'Could not create new user - duplicate entry',
                    }
                );
            }

            throw new ConflictException(
                error?.message || 'Could not create new user',
                {
                    description: 'Could not create new user',
                }
            );
        }
    }
}
