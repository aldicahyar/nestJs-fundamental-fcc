/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entity/song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Songs')
@Controller({
    path: 'songs',
    scope: Scope.REQUEST,
    version: '1',
})
export class SongsController {

    constructor(private readonly songsService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection,
    ) { console.log(`This connection ${this.connection.CONNECTION_STRING}`) }

    @Post()
    @ApiOperation({ summary: 'Create a song' })
    async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
        return await this.songsService.create(createSongDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all songs' })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return await this.songsService.paginate({
            page,
            limit,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a song by id' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.songsService.findOne(id);
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a song by id' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSongDto: UpdateSongDto):
        Promise<Song> {
        return this.songsService.updateSong(id, updateSongDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a song by id' })
    remove(@Param('id') id: number) {
        return this.songsService.remove(id);
    }
}

