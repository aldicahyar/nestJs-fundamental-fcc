import { Injectable } from "@nestjs/common";
import { Playlist } from "./entity/playlist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "src/songs/entity/song.entity";
import { User } from "src/users/entity/user.entity";
import { CreatePlaylistDTO } from "./dto/create-playlist.dto";

@Injectable()
export class PlaylistService {
    // constructor(
    //     @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    //     @InjectRepository(Song) private songRepository: Repository<Song>,
    //     @InjectRepository(User) private userRepository: Repository<User>,
    // ) { }

    // async create(playListDTO: CreatePlaylistDTO): Promise<Playlist> {
    //     const playlist = new Playlist();
    //     playlist.name = playListDTO.name;

    //     const songs = await this.songRepository.findByIds(playListDTO.songs);
    //     playlist.songs = songs;

    //     const user = await this.userRepository.findOneBy({ id: playListDTO.user });
    //     playlist.users = [user];

    //     return this.playlistRepository.save(playlist);
    // }
}