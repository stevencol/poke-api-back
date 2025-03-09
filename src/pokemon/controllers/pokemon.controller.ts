import { Controller, Get, HttpStatus, NotFoundException, Param, Res } from "@nestjs/common";
import { PokemonService } from "../services/pokemon.service";
import e, { Response } from 'express';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get("/:id")
    async getPokemon(@Res() res: Response, @Param('id') id: string)  {  
       
        try{
            const pokemon = await this.pokemonService.getPokemon(id);
            return res.status(HttpStatus.OK).json(pokemon);
            
        }catch(error){
   
            if(error instanceof NotFoundException){
                return res.status(error.getStatus()).json({
                    message: error.message,
                    error: 'NOT_FOUND',
                    statusCode: HttpStatus.NOT_FOUND,
                  });
            }
        
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Unexpected error',
                error: 'Internal Server Error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              });
        }
    }

}