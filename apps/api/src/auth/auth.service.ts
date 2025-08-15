// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    const access_token = this.jwtService.sign(payload);

    await this.sessionsRepository.delete({ username: user.username });

    const now = new Date();
    const expired = new Date(now.getTime() + 5 * 60 * 1000); // 5 menit ke depan

    const session = this.sessionsRepository.create({
      username: user.username,
      payload: access_token,
      expired,
    });
    await this.sessionsRepository.save(session);

    return { access_token: access_token };
  }
}
