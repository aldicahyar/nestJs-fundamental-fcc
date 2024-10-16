/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Song } from './entity/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/entity/artist.entity';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
    ) { }
    private readonly songs = [];


    // async create(createSongDto: CreateSongDto): Promise<Song> {
    //     const song = this.songRepository.create({
    //         ...createSongDto,
    //         createdAt: new Date(),
    //     });

    //     // Find all the artists based on the provided IDs
    //     const artists = await this.artistRepository.findByIds(createSongDto.artists);
    //     console.log('artists', artists);

    //     // Check if artists are found
    //     if (artists.length === 0) {
    //         throw new BadRequestException('No artists found for the provided IDs');
    //         console.log('No artists found for the provided IDs');
    //     }

    //     // Set the relation between the song and artists
    //     song.artists = artists;

    //     // Save the song
    //     return this.songRepository.save(song);
    // }

    async create(createSongDto: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = createSongDto.title;
        song.album = createSongDto.album;
        song.artists = createSongDto.artists;
        song.year = createSongDto.year;
        song.genre = createSongDto.genre;
        song.duration = createSongDto.duration;
        song.releasedDate = createSongDto.releasedDate;
        song.lyric = createSongDto.lyric;
        song.dominantLyric = createSongDto.dominantLyric;
        song.createdAt = new Date();
        song.createdBy = createSongDto.createdBy;
        song.updatedAt = new Date();
        song.updatedBy = createSongDto.updatedBy;
        console.log(song.artists)

        const artists = await this.artistRepository.findBy({
            id: In(createSongDto.artists)
        });
        console.log('artists', artists);
        song.artists = artists;
        return this.songRepository.save(song);
    }


    async findAll(): Promise<Song[]> {
        return await this.songRepository.find();
    }

    async findOne(id: number): Promise<Song> {
        const song = await this.songRepository.findOneBy({ id });
        if (!song) {
            throw new Error(`Song with id ${id} not found`);
        }
        return song;
    }

    async updateSong(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
        const song = await this.songRepository.findOneBy({ id });
        if (!song) {
            throw new Error(`Song with id ${id} not found`);
        }
        const updatedSong = { ...updateSongDto, updatedAt: new Date() };
        return await this.songRepository.save({ ...song, ...updatedSong });
    }

    async remove(id: number) {
        return await this.songRepository.delete(id);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('song');
        queryBuilder.orderBy('song.releasedDate', 'DESC');


        return paginate<Song>(queryBuilder, options);
    }
}
