import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserBio } from '../user-bio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBioDto } from '../dtos/create-bio.dto';
import { User } from '@/users/user.entity';
import { PatchBioDto } from '../dtos/patch-bio.dto';
import { PreferredGames } from '@/preferred-games/preferred-games.entity';
import { PreferredGamesService } from '@/preferred-games/providers/preferred-games.service';

@Injectable()
export class UsersBioService {

    constructor(
        private readonly dataSource: DataSource,
        /**
         * Injecting UserBio Repository.
         */
        @InjectRepository(UserBio)
        private readonly userBioRepository: Repository<UserBio>,


        /**
         * Injecting PreferredGames Service.
         */
        private readonly preferredGamesService: PreferredGamesService,
    ) { }

    public async createUserBio(User: User): Promise<any> {

        try {
            const bio = await this.userBioRepository.create({
                user: User,
            });
            return await this.userBioRepository.save(bio);
        } catch (error) {
            if (error.code === '23505') { // Duplicate entry error
                throw new ConflictException('Bio already exists for this user');
            }
            throw new InternalServerErrorException('Failed to create user bio');
        }
    }



    public async updateUserBio(patchBioDto: PatchBioDto) {
        return await this.dataSource.transaction(async manager => {
            const userBioRepoTx = manager.getRepository(UserBio);
            const preferredGamesRepoTx = manager.getRepository(PreferredGames);

            const { preferred_games, user_id, ...bioFields } = patchBioDto;

            let userBio = await userBioRepoTx.findOne({
                where: { user: { id: user_id } },
            });

            if (userBio) {
                await userBioRepoTx.update({ user: { id: user_id } }, bioFields);
            } else {
                userBio = userBioRepoTx.create({
                    user: { id: user_id },
                    ...bioFields,
                });
                userBio = await userBioRepoTx.save(userBio); // ✅ make sure to get inserted id
            }


            if (preferred_games) {
                await this.preferredGamesService.syncPreferredGames(userBio.id, preferred_games, manager); // ✅ pass correct FK
            }

            const updatedBio = await userBioRepoTx.findOne({
                where: { user: { id: user_id } },
                relations: ['preferred_games'],
            });

            return updatedBio;
        });
    }


}
