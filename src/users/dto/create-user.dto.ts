import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ type: String, description: 'First name of the user', example: 'John' })
    readonly firstName: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ type: String, description: 'Last name of the user', example: 'Doe' })
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'Email of the user', example: 'JohnDoe@gmail.com' })
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password too weak. It must contain at least one uppercase letter, one number, and one special character.',
    })
    @ApiProperty({ description: 'Password of the user', example: 'Password123!' })
    readonly password: string;

}