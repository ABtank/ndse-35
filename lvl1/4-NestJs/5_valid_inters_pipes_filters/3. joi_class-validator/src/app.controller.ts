import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { registerSchema } from './validation/schemas/register.schema';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { RegisterDto } from './dto/register.dto';
import { ValidationPipe } from './validation/validation.pipe';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('/register')
  register(@Body() body: RegisterDto) {
    return body;
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  login(@Body() body: LoginDto) {
    return body;
  }
}
