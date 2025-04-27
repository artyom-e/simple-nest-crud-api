import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }
  
  

  async signIn(data: SignInDto): Promise<string> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid password ');
    }

    return this.signInByUser(user);
  }

  async signInByUser(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.id };
    
    return this.jwtService.sign(payload);
  }

  async signUp(data: SignUpDto): Promise<string> {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = await this.usersService.createUser(data);

    return this.signIn(newUser);
  }
}
