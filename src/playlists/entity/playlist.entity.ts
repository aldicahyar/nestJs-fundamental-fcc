import { Song } from 'src/songs/entity/song.entity';
import { User } from 'src/users/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlists')
export class Playlist {
    [x: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

// @OneToMany(() => Song, (song) => song.playlist)
// songs: Song[];

// @ManyToOne(() => User, (user) => user.playlists)
// users: User[];