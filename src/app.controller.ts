import { Controller, Get, UseGuards, Request, Headers } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req, @Headers() headers) {
    console.log(headers);
    return req.user;
  }
}
