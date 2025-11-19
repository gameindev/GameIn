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
            // Validate that given_name is provided, otherwise use email prefix
            const username = googleUser.given_name || googleUser.email.split('@')[0] || `user_${Date.now()}`;

            console.log('Creating Google user with:', {
                email: googleUser.email,
                google_id: googleUser.google_id,
                username: username
            });

            const user = this.usersRepository.create({
                google_id: googleUser.google_id,
                email: googleUser.email,
                username: username,
                user_type: null
            });

            const savedUser = await this.usersRepository.save(user);

            console.log('Google user created successfully:', savedUser);
            return savedUser;

        } catch (error) {
            console.error('Error creating Google user:', error);
            console.error('Error details:', {
                message: error?.message,
                code: error?.code,
                constraint: error?.constraint,
                detail: error?.detail,
                stack: error?.stack
            });

            // If it's a unique constraint violation, provide more context
            if (error?.code === '23505') { // PostgreSQL unique violation
                const constraint = error?.constraint || '';
                const field = constraint.includes('email') ? 'email' : constraint.includes('username') ? 'username' : 'google_id';
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
