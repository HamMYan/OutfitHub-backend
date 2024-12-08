import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt'
import { EmailService } from 'src/email/email.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly emailService: EmailService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { name, surname, email, password, age, phonenumber } = createUserDto;

    const userinEmail = await this.userRepository.findOne({
      where: { email },
      select: ['email']
    })
    if (userinEmail) throw new ForbiddenException(`Email - ${email} has arleady`)

    const userinPhone = await this.userRepository.findOne({
      where: { phonenumber },
      select: ['phonenumber']
    })
    if (userinPhone) throw new ForbiddenException(`Phonenumber - ${phonenumber} has arleady`)

    const hashedPass = await bcrypt.hashSync(password, 10)
    const newUser = await this.userRepository.save({
      name,
      surname,
      email,
      password: hashedPass,
      age,
      phonenumber,
      code: uuid()
    })

    const message = `They are trying to register with OutfitHub with your email address, if this is you, please click    
     <a href='http://localhost:3001/auth/verify?email=${email}&emailToken=${newUser.code}'>here</a> to proceed with verification. `;

    this.emailService.sendMail(
      'hammkrtchyan7@gmail.com',
      `Hello dear ${name} welcome our site`,
      message,
    )

    return 'We sent verification link in your email, please check your email'
  }

  async isVerify(email: string, code: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'code']
    })
    if (!user) throw new NotFoundException('User not found')
    await this.userRepository.update(user.id, {
      code: null,
      isVerify: true
    })
    return {message:'User veryfied'}
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneUsername(username: string) {
    return await this.userRepository.findOne({
      where: { email: username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
