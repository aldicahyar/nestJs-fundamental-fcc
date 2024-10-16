import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable({
    scope: Scope.TRANSIENT,
})
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = createUserDto.password;
        user.email = createUserDto.email;
        user.createdAt = new Date();

        return this.userRepository.save(user);
    }

    async updateUser(id: number, updateDTO: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User id ${id} not found`);
        }
        const updatedUser = { ...updateDTO, updateAt: new Date() };
        return await this.userRepository.save({ ...user, ...updatedUser });

    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        console.log(user);
        if (!user) {
            throw new Error(`User id ${id} not found`);
        }
        return await this.userRepository.remove(user);
    }
}