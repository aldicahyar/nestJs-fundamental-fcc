import { IsNotEmpty, isNotEmpty, IsString } from "class-validator"
import { Song } from './../../songs/entity/song.entity';

export class CreatePlaylistDTO {
    [x: string]: any;
    //Playlist Spotify DTO

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    readonly songs: string

    @IsString()
    @IsNotEmpty()
    readonly description: string

    @IsString()
    @IsNotEmpty()
    readonly visibility: string

    @IsString()
    @IsNotEmpty()
    readonly collaborative: string

    @IsString()
    @IsNotEmpty()
    readonly public: string

    @IsString()
    @IsNotEmpty()
    readonly snapshot_id: string

    @IsString()
    @IsNotEmpty()
    readonly tracks: string

    @IsString()
    @IsNotEmpty()
    readonly type: string

    @IsString()
    @IsNotEmpty()
    readonly uri: string

}