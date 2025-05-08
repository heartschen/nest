import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/database/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建用户
   * @param username 用户名
   * @param password 密码
   * @returns 用户
   */
  async createUser(createUserDto: CreateUserDto) {
    // 判断用户是否存在
    const user = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });

    if (user) {
      throw new BadRequestException('用户已存在');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  /**
   * 根据用户ID获取用户
   * @param userId 用户ID
   * @returns 用户
   */
  async getUserByUserId(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  /**
   * 根据用户名获取用户
   * @param username 用户名
   * @returns 用户
   */
  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  /**
   * 根据微信开放ID获取用户
   * @param openId 微信开放ID
   * @returns 用户
   */
  async findByWeChatOpenId(openId: string) {
    return this.prisma.user.findUnique({ where: { weChatOpenId: openId } });
  }

  /**
   * 更新用户
   * @param id 用户ID
   * @param updateUserDto 更新用户DTO
   * @returns 用户
   */
  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @returns 用户
   */
  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 查询所有用户
   * @returns 用户列表
   */
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, weChatOpenId, ...user }) => user);
  }
}
