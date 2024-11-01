import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(password);
      return result;
    }
    return null;
  }

  async jwtValidateUser(id: number): Promise<any> {
    const user = await this.userService.findById(id);
    if (user) {
      return user;
    }
    return null;
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
