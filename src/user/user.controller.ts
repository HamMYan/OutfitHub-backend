import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from './entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    try {
      const response = await this.userService.create(createUserDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (err) {
      return res.status(HttpStatus.OK).json({ error: err.message });
    }
  }

  @Get()
  async findAll(
    @Res() res: Response
  ) {
    try {
      return await this.userService.findAll();
    } catch (err) {
      console.error('Error in findAll:', err);
      return res.status(HttpStatus.OK).json({ error: err.message })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (err) {
      return err
    }
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (err) {
      return err
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(+id);
    } catch (err) {
      return err
    }
  }
}
