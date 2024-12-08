import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService:JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneUsername(username);
    if (user && bcrypt.compareSync(pass, user.password) && user.isVerify === true) {
      return user;
    }
    else{
      return false
    };
  }

  async login(user:any){
    const payload = {
        id: user.id,
        firstName: user.name,
        lastName: user.surname,
        username: user.email,
        role: user.role
    }
    return {
        acces_token: this.jwtService.sign(payload)
    }
  }
}
