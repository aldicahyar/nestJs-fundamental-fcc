/* eslint-disable prettier/prettier */
import { IsArray, IsMilitaryTime, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Artist } from 'src/artists/entity/artist.entity';
import { DeepPartial } from 'typeorm';

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly artists: Artist[];

    @IsString()
    @IsNotEmpty()
    readonly album: string

    @IsString()
    @IsNotEmpty()
    readonly year: string

    @IsString()
    @IsNotEmpty()
    readonly genre: string

    @IsString()
    @IsNotEmpty()
    readonly duration: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'releasedDate must be in the format YYYY-MM-DD' })
    readonly releasedDate: Date

    @IsString()
    readonly lyric: string

    @IsString()
    readonly dominantLyric: string

    readonly createdAt: Date

    @IsString()
    readonly createdBy: string
    updatedBy: string;
}
