import { Injectable } from '@nestjs/common';
import { UserPayload } from './model/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserToken } from './model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<UserToken> {
    const user = await this.validateUser(email, password);

    const payload: UserPayload = {
      username: user.email,
      sub: user.id!,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new UnauthorizedError(
      `Email address or password provided is incorrect.`,
    );
  }
}
