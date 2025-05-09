import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Public } from '@/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configServer: ConfigService,
  ) {}

  @ApiOperation({
    summary: '查询所有用户',
  })
  @Get('all')
  getAllUser() {
    return this.userService.getAllUsers();
  }
}
