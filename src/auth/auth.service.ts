import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { UserDocument } from '../users/user.schema';
import { UsersService } from '../users/users.service';

import { AccessTokenDto } from './dto/access-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findOneByEmail(email);
    const valid = user && (await compare(password, user.password));

    if (valid) {
      return user;
    }
    return null;
  }

  login(user: UserDocument): AccessTokenDto {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<AccessTokenDto> {
    const exists = await this.usersService.findOneByEmail(email);
    if (exists) {
      throw new Error('Email already registered. Please login instead.');
    }

    const hashedPassword = await hash(password, 10);
    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return this.login(user);
  }
}
