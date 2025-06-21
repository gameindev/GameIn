import { Controller } from '@nestjs/common';
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
