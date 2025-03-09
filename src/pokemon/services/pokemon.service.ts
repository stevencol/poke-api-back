import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PokemonMapper } from './../../utils/pokemon.maper';
import { PokemonResponseDto } from '../dtos/pokemonResponse.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { response } from 'express';
import { PokeApiPokemonRequestDto } from '../dtos/pokemonApiResponse.dto';
import { PokemonCacheService } from './pokemonCache.service';

@Injectable()
export class PokemonService {
  private readonly pokeApiUrl: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private readonly pokemonCacheService: PokemonCacheService,
  ) {}

  async getPokemon(id: string) {
    const pokeUrl = this.configService.get<string>('POKE_API_URL');
    try {
      let pokemons: PokemonResponseDto[] =
        (await this.pokemonCacheService.getPokemonCache()) || [];
      if (pokemons) {
        const pokemon: PokemonResponseDto | null = await this.getPokemonCache(
          id,
          pokemons,
        );
        if (pokemon) {

          return pokemon;
        }
      }

      const response = await lastValueFrom(
        this.httpService.get(`${pokeUrl}/${id}`),
      );
      const pokeApiDto: PokeApiPokemonRequestDto = response.data;
      pokemons.push(PokemonMapper.toPokemonResponseDto(pokeApiDto));
      await this.pokemonCacheService.setPokemonCache(pokemons);
      return PokemonMapper.toPokemonResponseDto(pokeApiDto);
    } catch (error) {
      if (error.response.status == 404) {
        throw new NotFoundException(`Pokemon not found by id/name: ${id}`);
      } else {
        throw new HttpException(`Pokemon error: ${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getPokemonCache(
    id: string,
    pokemons: PokemonResponseDto[],
  ): Promise<PokemonResponseDto | null> {
    if (pokemons) {
      const pokemon = pokemons.find((pokemon) => pokemon.id === Number(id));
      if (pokemon) {
        return pokemon;
      }
    }
    return null;
  }
}
