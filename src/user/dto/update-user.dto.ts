import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class Login {
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;
  }