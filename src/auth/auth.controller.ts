import { AuthService } from './auth.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signIn(@Body() body: SigninUserDto) {
    const { username, password } = body;

    return this.authService.signIn(username, password);
  }

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }
}
