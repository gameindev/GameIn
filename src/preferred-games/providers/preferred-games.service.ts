import { EntityManager, Repository } from "typeorm";
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
        manager: EntityManager
    ) {
        const repo = manager.getRepository(PreferredGames);

        const existingGames = await repo.find({
            where: { user_bio: { id: userBioId } },
        });

        const existingIds = existingGames.map(g => g.id);
        const incomingIds = games.map(g => g.id).filter(id => id != null);

        const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
        if (idsToDelete.length > 0) {
            await repo.delete(idsToDelete);
        }

        for (const game of games) {
            if (game.id) {
                await repo.update(game.id, {
                    game_url: game.game_url,
                    sort_order: game.sort_order,
                    meta_data: game.meta_data,
                });
            } else {
                await repo.save({
                    user_bio: { id: userBioId },
                    game_url: game.game_url,
                    sort_order: game.sort_order,
                    meta_data: game.meta_data,
                });
            }
        }
    }


}
