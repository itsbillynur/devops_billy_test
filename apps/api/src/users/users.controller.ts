import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionAuthGuard } from '../sessions/session-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/list")
  @UseGuards(SessionAuthGuard)
  async getAllUsers(@Request() req) {
    return this.usersService.findAll();
  }
}
