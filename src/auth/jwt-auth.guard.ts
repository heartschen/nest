// auth/jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator'; // 导入你定义的 KEY

/**
 * JwtAuthGuard 用于鉴权守卫，确保请求中有有效的 JWT。
 * 它继承了 Passport 的 AuthGuard（'jwt'），
 * 其中 'jwt' 对应的是我们在 JwtStrategy 中定义的策略名称。
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    // 注入 Reflector
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 检查路由处理程序或控制器上是否有 @Public() 装饰器设置的元数据
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公开路由，则直接允许访问，跳过 JWT 验证
    if (isPublic) {
      return true;
    }

    // 否则，执行默认的 JWT 验证逻辑
    return super.canActivate(context);
  }
}
