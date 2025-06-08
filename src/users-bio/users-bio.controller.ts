import { Controller, Post } from '@nestjs/common';
import { CreateBioDto } from './dtos/create-bio.dto';
import { UsersBioService } from './providers/users-bio.service';

@Controller('users-bio.controller')
export class UsersBioController {

    constructor(
        /**
         * Injecting UserBioService
         */
        private userBioService: UsersBioService,
    ) { }

    
}
