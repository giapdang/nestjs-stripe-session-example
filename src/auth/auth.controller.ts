import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/createUser.dto';
import UserLoginDto from '../dto/UserLoginDto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: UserLoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
