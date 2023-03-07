import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('token')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: object }) {
    const user = req.user as { email: string };
    const userInfo = await this.userService.getUserInfo(user.email);
    return userInfo;
  }
}
