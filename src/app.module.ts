import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    UserModule,
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'outfit_hub',
      entities: [User],
      synchronize: true,
      // logging: ['query', 'error']
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      }
    }),
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
