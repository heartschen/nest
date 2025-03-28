import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户注册
   * @param username 用户名
   * @param password 密码
   * @returns 生成的用户信息
   */
  async signUp(createUserDto: CreateUserDto) {
    // 调用 UserService 创建用户
    const newUser = await this.userService.createUser(createUserDto);

    // 生成 token
    const token = this.generateToken(newUser.id, newUser.username);

    return {
      ...omit(newUser, ['password']),
      token,
    };
  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * @returns 登录成功的 token
   */
  async signIn(username: string, password: string) {
    // 查询用户
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 校验密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 生成 token
    const token = this.generateToken(user.id, user.username);

    return { ...omit(user, ['password']), token };
  }

  /**
   * 生成 JWT 令牌
   * @param userId 用户ID
   * @param username 用户名
   * @returns JWT token
   */
  private generateToken(userId: string, username: string) {
    return this.jwtService.sign({ userId, username });
  }
}
