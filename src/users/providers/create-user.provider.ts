import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dtos/post-create-user.dto';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorProfilesService } from '../../creator-profiles/providers/creator-profiles.service';
import { BrandProfilesService } from '../../brand-profiles/providers/brand-profiles.service';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { EmailsService } from '../../emails/emails.service';
import { NotificationEventsService } from '../../notifications/providers/notification-events.service';
import { NotificationService } from '../../notifications/providers/notification.service';
import { NotificationType } from '../../notifications/enums/notification-type.enum';
import { NotificationChannel } from '../../notifications/enums/notification-channel.enum';
import { generateToken } from '../utils/common-utilities';
import { UserType } from '../enums/user-type.enums';
import { NewsfeedService } from '../../newsfeed/providers/newsfeed.service';
import { PostType } from '../../newsfeed/enums/post-type.enum';
import { PostVisibility } from '../../newsfeed/enums/post-visibility.enum';
import { SystemPostCategory } from '../../newsfeed/enums/system-post-category.enum';


@Injectable()
export class CreateUserProvider {
    private readonly logger = new Logger(CreateUserProvider.name);


    constructor(
        /**
         * Injecting User Repository.
         */
        @InjectRepository(User)
        private userRepository: Repository<User>,

        /**
         * Inject CreatorProfileService.
         */
        @Inject(CreatorProfilesService)
        private readonly creatorProfileService: CreatorProfilesService,

        /**
         * Inject BrandProfilesService.
         */
        @Inject(BrandProfilesService)
        private readonly brandProfileService: BrandProfilesService,

        /**
         * Injecting HashingProvider.
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,

        /**
         * Injecting EmailService
         */
        private readonly emailService: EmailsService,

        /**
         * Injecting NotificationEventsService
         */
        private readonly notificationEvents: NotificationEventsService,

        /**
         * Injecting NotificationService for preference initialization
         */
        private readonly notificationService: NotificationService,

        /**
         * Injecting Datasource.
         */
        private readonly dataSource: DataSource,

        /**
         * Injecting NewsfeedService for creating welcome posts
         */
        @Inject(forwardRef(() => NewsfeedService))
        private readonly newsfeedService: NewsfeedService,
    ) { }


    public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const { password, ...rest } = createUserDto;
        const queryRunner = this.dataSource.createQueryRunner()

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction()
            const hashedPassword = await this.hashingProvider.hashPassword(password);

            const newUser = queryRunner.manager.create(User, {
                ...rest,
                token: generateToken(),
                password: hashedPassword,
            })

            const savedUser = await queryRunner.manager.save(User, newUser);

            // Send verification notification via notification service
            const verifyUrl = process.env.EMAIL_VERIFICATION_URL + '/#/verify-account?email=' + savedUser.email + '&token=' + savedUser.token;
            // https://gamein.gg/#/verify-account?email=test@test.com&token=1234567890
            // Publish notification event (async, non-blocking)
            this.notificationEvents.publishNotification({
                userId: savedUser.id,
                type: NotificationType.USER_WELCOME,
                channels: [NotificationChannel.EMAIL],
                title: 'Welcome to GameIn - Verify Your Account',
                message: `Hi ${savedUser.username}, welcome to GameIn! Please verify your account by clicking the link below.`,
                data: {
                    username: savedUser.username,
                    verifyUrl: verifyUrl,
                    token: savedUser.token,
                },
                metadata: {
                    email: savedUser.email,
                    emailTemplate: 'verify-account',
                    emailSubject: 'GameIn Account Verification',
                    emailData: {
                        username: savedUser.username,
                        verifyUrl: verifyUrl,
                    },
                },
                priority: 'high',
            }).catch((error) => {
                // Log error but don't fail user creation
                this.logger.error('Failed to send verification notification:', error);
            });

            if (savedUser.user_type === UserType.CREATOR) {
                await this.creatorProfileService.createProfileForUser(savedUser, queryRunner);
            } else if (savedUser.user_type === UserType.BRAND) {
                await this.brandProfileService.createProfileForUser(savedUser, queryRunner);
            }

            if (queryRunner.isTransactionActive) {
                await queryRunner.commitTransaction();
            }

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

            // never return sensitive fields
            const { password: _, ...safe } = savedUser;
            return safe;
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                try {
                    await queryRunner.rollbackTransaction();
                } catch (rbErr) {
                    this.logger.warn(`Rollback failed: ${(rbErr as any)?.message}`);
                }
            }

            this.logger.error('CreateUser failed', {
                code: error?.code,
                message: error?.message,
                detail: error?.detail,
                constraint: error?.constraint,
                column: error?.column,
                stack: error?.stack,
            });

            // friendly mapping
            switch (error?.code) {
                case '23505': { // unique_violation
                    const d = (error?.detail || '').toLowerCase();
                    if (d.includes('username')) throw new BadRequestException('Username is already taken');
                    if (d.includes('email')) throw new BadRequestException('Email is already registered');
                    throw new BadRequestException('User already exists');
                }
                case '23502': // not_null_violation
                    throw new BadRequestException(`Missing required field: ${error?.column ?? 'unknown'}`);
                case '22P02': // invalid_text_representation (often enum)
                    throw new BadRequestException(error?.detail ?? 'Invalid value provided');
                case '22001': // string_data_right_truncation
                    throw new BadRequestException(`Value too long for: ${error?.column ?? 'unknown'}`);
                case '23503': // foreign_key_violation
                    throw new BadRequestException(`Related entity missing: ${error?.detail ?? ''}`);
                default:
                    throw new InternalServerErrorException(error?.detail ?? error?.message ?? 'Failed to create user');
            }
        } finally {
            try {
                await queryRunner.release();
            } catch (relErr) {
                this.logger.warn(`Release failed: ${(relErr as any)?.message}`);
            }
        }

    }

    /**
     * Creates a user.
     * @param createUserDto 
     * @returns 
     */
    // public async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    //     const { password, ...rest } = createUserDto;
    //     const hashedPassword = await this.hashingProvider.hashPassword(password);

    //     const newUser = this.userRepository.create({
    //         ...rest,
    //         password: hashedPassword,
    //     });


    //     try {
    //         const savedUser = await this.userRepository.save(newUser);

    //         await this.userBioService.createUserBio(savedUser);

    //         if (savedUser.userType === UserType.CREATOR) {
    //             await this.creatorProfileService.createProfileForUser(savedUser);
    //         } else if (savedUser.userType === UserType.BRAND) {
    //             await this.brandProfileService.createProfileForUser(savedUser);
    //         }

    //         return savedUser
    //     } catch (error) {
    //         // PostgreSQL unique constraint violation code
    //         if (error.code === '23505') {
    //             const detail = error.detail;

    //             if (detail.includes('username')) {
    //                 throw new BadRequestException('Username is already taken');
    //             } else if (detail.includes('email')) {
    //                 throw new BadRequestException('Email is already registered');
    //             }

    //             // fallback
    //             throw new BadRequestException('User already exists');
    //         }

        //         throw new InternalServerErrorException('Failed to create user');
        //     }
        // }

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
