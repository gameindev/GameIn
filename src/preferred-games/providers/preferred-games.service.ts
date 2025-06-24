import { Repository } from "typeorm";
import { PreferredGames } from "../preferred-games.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PatchPreferredGamesDto } from "../dto/patch-preferred-games.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PreferredGamesService {
    constructor(
        @InjectRepository(PreferredGames)
        private readonly preferredGamesRepository: Repository<PreferredGames>,
    ) { }

    async syncPreferredGames(
        userBioId: number,
        games: PatchPreferredGamesDto[],
    ) {
        const existingGames = await this.preferredGamesRepository.find({
            where: { userBio: { id: userBioId } },
        });

        const existingIds = existingGames.map(g => g.id);
        const incomingIds = games.map(g => g.id).filter(id => id != null);

        const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
        if (idsToDelete.length > 0) {
            await this.preferredGamesRepository.delete(idsToDelete);
        }

        for (const game of games) {
            if (game.id) {
                await this.preferredGamesRepository.update(game.id, {
                    gameUrl: game.gameUrl,
                    sortOrder: game.sortOrder,
                    metadata: game.metaData,
                });
            } else {
                await this.preferredGamesRepository.insert({
                    userBio: { id: userBioId },
                    gameUrl: game.gameUrl,
                    sortOrder: game.sortOrder,
                    metadata: game.metaData,
                });
            }
        }
    }
}
