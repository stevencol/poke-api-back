
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PokemonModule,
    CacheModule.register({
      ttl: 0, 
      max:1
    })
    ,ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
})
export class AppModule {}
