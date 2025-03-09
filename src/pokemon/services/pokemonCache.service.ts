import { Inject, Injectable } from "@nestjs/common";
import { PokemonResponseDto } from "../dtos/pokemonResponse.dto";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 

@Injectable()
export class PokemonCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    async setPokemonCache(pokemon:PokemonResponseDto[]) {

        await this.cacheManager.set('pokemons', pokemon);
    }


    async getPokemonCache(){
        const cachedPokemons = await this.cacheManager.get<PokemonResponseDto[]>('pokemons');

        return cachedPokemons;
    }


}