/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { connection } from 'src/common/constants/connection';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entity/song.entity';
import { Artist } from 'src/artists/entity/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Artist])
  ],
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    }]
})
export class SongsModule { }
