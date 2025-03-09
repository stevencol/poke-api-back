import { IsArray, IsNumber, IsString } from "class-validator";

export class PokemonResponseDto {

    @IsNumber()
    id: number;
    @IsString()
    name: string;
    @IsArray()
    types: string[];
    @IsArray()
    abilities: string[];
    @IsString()
    spriteUrl: string;
    @IsString()
    imageStandar: string;
    @IsString()
    imageShiny: string;

}