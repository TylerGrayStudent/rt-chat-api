import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './../models/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: User): Promise<User> {
    console.log(createUserDto);
    return this.service.create(createUserDto);
  }

  @Get('/:id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }
}
