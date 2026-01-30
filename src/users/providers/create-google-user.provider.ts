import { ConflictException, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from '../interfaces/google-user.intefrace';
import { NotificationService } from '../../notifications/providers/notification.service';
import { NewsfeedService } from '../../newsfeed/providers/newsfeed.service';
import { PostType } from '../../newsfeed/enums/post-type.enum';
import { PostVisibility } from '../../newsfeed/enums/post-visibility.enum';
import { SystemPostCategory } from '../../newsfeed/enums/system-post-category.enum';

@Injectable()
export class CreateGoogleUserProvider {
    private readonly logger = new Logger(CreateGoogleUserProvider.name);

    constructor(
        /**
         * Injecting UserRepository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        /**
         * Injecting NotificationService for preference initialization
         */
        @Inject(NotificationService)
        private readonly notificationService: NotificationService,

        /**
         * Injecting NewsfeedService for creating welcome posts
         */
        @Inject(forwardRef(() => NewsfeedService))
        private readonly newsfeedService: NewsfeedService,

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

            // Initialize default notification preferences (async, non-blocking)
            this.notificationService.initializeDefaultPreferences(savedUser.id).catch((error) => {
                // Log error but don't fail user creation
                this.logger.error('Failed to initialize default notification preferences:', error);
            });

            // Create welcome system post (async, non-blocking)
            this.createWelcomePost(savedUser).catch((error) => {
                // Log error but don't fail user creation
                this.logger.error('Failed to create welcome post:', error);
            });

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

    /**
     * Create a welcome system post for new users
     */
    private async createWelcomePost(user: User): Promise<void> {
        try {
            const welcomeContent = `Welcome to GameIn, ${user.username}! 🎮

We're thrilled to have you join our community. Get started by:
• Completing your profile
• Exploring the newsfeed
• Connecting with other gamers and creators
• Discovering amazing content

If you have any questions, feel free to reach out. Happy gaming!`;

            // Create a welcome system post visible only to the new user in their feed
            // But visible to all when viewing their profile page
            await this.newsfeedService.createSystemPost({
                type: PostType.TEXT,
                visibility: PostVisibility.PUBLIC,
                content: welcomeContent,
                system_category: SystemPostCategory.WELCOME,
                user_id: user.id, // User-specific system post
                metadata: {
                    username: user.username,
                    userType: user.user_type,
                },
            });

            this.logger.log(`Welcome post created for user ${user.id} (${user.username})`);
        } catch (error) {
            this.logger.error(`Failed to create welcome post for user ${user.id}: ${error.message}`, error.stack);
            throw error;
        }
    }
}
