
import { PokeApiPokemonRequestDto } from './../pokemon/dtos/pokemonApiResponse.dto';
import { PokemonResponseDto } from './../pokemon/dtos/pokemonResponse.dto';
export class PokemonMapper{

    static toPokemonResponseDto(pokemon:PokeApiPokemonRequestDto): PokemonResponseDto{
        const pokemonResponseDto = new PokemonResponseDto();
        pokemonResponseDto.id = pokemon.id;
        pokemonResponseDto.name = pokemon.name;
        pokemonResponseDto.types = pokemon.types.map(type => type.type.name);
        pokemonResponseDto.abilities = pokemon.abilities.map(ability => ability.ability.name);
        pokemonResponseDto.spriteUrl = pokemon.sprites.front_default;
        pokemonResponseDto.imageStandar = pokemon.sprites.other.home.front_default;
        pokemonResponseDto.imageShiny = pokemon.sprites.other.home.front_shiny;
        return pokemonResponseDto;
    }

}