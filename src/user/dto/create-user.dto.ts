import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    surname: string

    @ApiProperty()
    age: number

    @ApiProperty()
    email: string
    
    @ApiProperty()
    phonenumber: number
    
    @ApiProperty()
    password: string
}
