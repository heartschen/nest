import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    required: true,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({
    description: '密码',
    required: true,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({
    description: '用户角色',
    required: false,
    default: 'user',
  })
  role: string;

  @ApiProperty({
    description: '用户状态',
    required: false,
    default: 'active',
    enum: ['active', 'inactive', 'banned'],
  })
  status: string;

  @ApiProperty({
    description: '微信OpenID',
    required: false,
  })
  weChatOpenId: string;
}
