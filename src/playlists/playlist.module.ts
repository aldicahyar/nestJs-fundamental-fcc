import { Module } from "@nestjs/common";
import { Playlist } from "./entity/playlist.entity";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "src/songs/entity/song.entity";
import { User } from "src/users/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
})
export class PlaylistModule { }