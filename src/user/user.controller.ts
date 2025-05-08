import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Public } from '@/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configServer: ConfigService,
  ) {}

  @Get('all')
  getAllUser() {
    return this.userService.getAllUsers();
  }
}
