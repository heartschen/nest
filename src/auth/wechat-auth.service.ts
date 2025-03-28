import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WeChatAuthService {
  private appId = '你的微信小程序APPID';
  private appSecret = '你的微信小程序SECRET';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async weChatLogin(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`;

    const response = await axios.get(url);
    const { openid, session_key, errcode, errmsg } = response.data;

    if (errcode) {
      throw new UnauthorizedException(`微信登录失败: ${errmsg}`);
    }

    let user = await this.userService.findByWeChatOpenId(openid);

    if (!user) {
      user = await this.userService.createUser(openid, '');
    }

    const payload = { userId: user.id, weChatOpenId: openid };

    return { access_token: this.jwtService.sign(payload) };
  }
}
