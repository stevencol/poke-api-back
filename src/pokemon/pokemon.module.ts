import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './services/pokemon.service';
import { PokemonCacheService } from './services/pokemonCache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({

    controllers: [PokemonController],
    providers: [PokemonService,PokemonCacheService],
    imports: [HttpModule,CacheModule.register({
        max:1,
    })],
exports: [PokemonService, PokemonCacheService],
})
export class PokemonModule {}
