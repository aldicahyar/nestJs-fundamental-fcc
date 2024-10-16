import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Scope } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller({
    path: 'users',
    scope: Scope.REQUEST,
    version: '1',
})
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a user' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user by id' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateUserDto):
        Promise<User> {
        return await this.userService.updateUser(id, updateDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by id' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.userService.findOne(id);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete a user by id' })
    async remove(@Param('id') id: number): Promise<User> {
        return await this.userService.remove(id);
    }

}