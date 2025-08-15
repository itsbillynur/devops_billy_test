// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { SessionAuthGuard } from '../sessions/session-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [UsersController],
  providers: [UsersService, SessionAuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
