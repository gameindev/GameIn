import { Module } from '@nestjs/common';
import { PreferredGamesController } from './preferred-games.controller';
import { PreferredGamesService } from './providers/preferred-games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferredGames } from './preferred-games.entity';

@Module({
    controllers: [PreferredGamesController],
    providers: [PreferredGamesService],
    exports: [PreferredGamesService],
    imports: [
        TypeOrmModule.forFeature([PreferredGames])
    ]
})
export class PreferredGamesModule { }
