import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService]
})
export class UserModule { }
