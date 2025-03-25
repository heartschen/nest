import { AuthService } from './auth.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signIn(@Body() body: SigninUserDto) {
    const { username, password } = body;

    return this.authService.signIn(username, password);
  }

  @Post('/signup')
  signUp(@Body() body: SigninUserDto) {
    const { username, password } = body;

    return this.authService.signUp(username, password);
  }
}
