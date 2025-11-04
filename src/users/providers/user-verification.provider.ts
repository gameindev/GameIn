import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { generateToken } from "../utils/common-utilities";
import { EmailsService } from "../../emails/emails.service";


@Injectable()
export class UserVerificationProvider {
    constructor(
        private readonly emailService: EmailsService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async sendVerificationEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const token = generateToken();
        user.token = token;
        const savedUser = await this.userRepository.save(user);


        await this.emailService.sendTemplate('verify-account', {
            username: savedUser.username,
            verifyUrl: process.env.FRONTEND_HOST + '/#/verify-account?email=' + email + '&token=' + token,
        }, {
            subject: 'GameIn Account Verification',
            to: savedUser.email,
        });


        return { message: 'Verification email sent successfully' };
    }



    async verifyEmail(token: string) {
        const user = await this.userRepository.findOne({ where: { token } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.is_verified = true;
        user.token = null;
        const savedUser = await this.userRepository.save(user);
        return { message: 'Email verified successfully', user: {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            is_verified: savedUser.is_verified,
        } };
    }
}