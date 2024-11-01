import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/token')
  getToken(): string {
    return this.authService.createToken({ id: 2 });
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(JwtAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
