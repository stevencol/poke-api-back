import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator';
import { TypeDto } from './type';
import { AbilityDto } from './ability.dto';

export class PokeApiPokemonRequestDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @Type(() => TypeDto)
  types: TypeDto[];

  @Type(() => AbilityDto)
  abilities: AbilityDto[];

    @IsObject()
    @ValidateNested()
    @Type(() => Sprites)
    sprites: Sprites;
}

class Sprites {
  @IsArray()
  front_default: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Other)
  other: Other;
}

class Other {
  @IsObject()
  @ValidateNested()
  @Type(() => Home)
  home: Home;
}

class Home {
  @IsString()
  front_default: string;
  @IsString()
  front_shiny: string;
}
