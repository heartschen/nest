import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@/user/user.service'; // 假设你需要验证后查找用户

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // 注入所需服务，例如 UserService
    super({
      // 指定从 'v-token' HTTP 头部提取 JWT
      jwtFromRequest: ExtractJwt.fromHeader('v-token'),
      ignoreExpiration: false,
      // 使用环境变量或配置服务获取密钥，确保与生成 token 时使用的密钥一致
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * 验证 JWT payload
   * @param payload 解码后的 JWT 内容 (你在 generateToken 中放入的内容)
   * @returns 返回值会被附加到请求对象上 (通常是 request.user)
   */
  async validate(payload: { userId: string; username: string }) {
    // 可以在这里根据 payload 中的信息（例如 userId）查询数据库，确保用户存在且有效
    const user = await this.userService.getUserByUserId(payload.userId);
    if (!user) {
      throw new UnauthorizedException('无效的令牌或用户不存在');
    }
    // 你可以只返回 payload，或者返回完整的用户信息（不含敏感信息）
    // 这里我们返回解码后的 payload 内容，AuthService 中生成 token 时放入了 userId 和 username
    return { userId: payload.userId, username: payload.username };
  }
}
