import { title } from "process";
import { Artist } from "src/artists/entity/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    // @Column('varchar', { array: true })
    // artist: string[];

    @Column()
    album: string

    @Column()
    year: string

    @Column()
    genre: string

    @Column('time')
    duration: string

    @Column('date')
    releasedDate: Date

    @Column({ nullable: true })
    lyric: string

    @Column({ nullable: true })
    dominantLyric: string

    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    createdBy: string

    @Column({ nullable: true })
    updatedAt: Date

    @Column({ nullable: true })
    updatedBy: string

    @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
    @JoinTable({ name: 'songs_artists' })
    artists: Artist[];
}