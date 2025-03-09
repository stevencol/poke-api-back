import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

const mockPokemonService = {
  getPokemon: jest.fn(),
};

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return pokemon data with status 200', async () => {
      const mockResponse = { id: 1, name: 'Pikachu' };
      mockPokemonService.getPokemon.mockResolvedValue(mockResponse);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.getPokemon(res, '1');
      
      expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should return error message with status 404 when pokemon is not found', async () => {
        mockPokemonService.getPokemon.mockRejectedValue(
            new NotFoundException('Pokemon not found by id/name: 999sdfsdf')
          );
    


      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await controller.getPokemon(res, '999sdfsdf');  

      expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('999sdfsdf');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: 'Pokemon not found by id/name: 999sdfsdf',error: "NOT_FOUND",statusCode: 404 });
    });
  });
});
