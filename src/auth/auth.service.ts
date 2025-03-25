import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn(username: string, password: string) {
    return 'Sign In';
  }

  signUp(username: string, password: string) {
    return 'Sign Up';
  }
}
