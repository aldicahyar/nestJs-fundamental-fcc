import { IsArray, IsString, IsDateString, IsOptional, IsNumber } from "class-validator";
import { Artist } from "src/artists/entity/artist.entity";

export class UpdateSongDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly artists: Artist[];

    @IsOptional()
    @IsString()
    readonly album?: string;

    @IsOptional()
    @IsString()
    readonly year?: string;

    @IsOptional()
    @IsString()
    readonly genre?: string;

    @IsOptional()
    @IsString()
    readonly duration?: string;

    @IsOptional()
    @IsDateString()
    readonly releasedDate?: Date;

    @IsOptional()
    @IsString()
    readonly lyric?: string;

    @IsOptional()
    @IsString()
    readonly dominantLyric?: string;

    @IsOptional()
    @IsDateString()
    readonly updatedAt?: Date;

    @IsOptional()
    @IsString()
    readonly updatedBy?: string;
}