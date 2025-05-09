import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 新增导入

export class SigninUserDto {
  @ApiProperty({
    description: '用户名',
    minLength: 5,
    maxLength: 16,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是一个字符串' })
  @Length(5, 16, { message: '用户名长度必须大于5小于16位的字符' })
  username: string;

  @ApiProperty({
    description: '密码',
    minLength: 6,
    maxLength: 16,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是一个字符串' })
  @Length(6, 16, { message: '密码长度必须大于5小于16位的字符' })
  password: string;
}
