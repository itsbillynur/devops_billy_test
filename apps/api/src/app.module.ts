// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Session } from './sessions/entities/session.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST')?.replace(/^['"]|['"]$/g, ''),
        port: parseInt(config.get<string>('POSTGRES_PORT') ?? '5432', 10),
        username: config.get<string>('POSTGRES_USER')?.replace(/^['"]|['"]$/g, ''),
        password: config.get<string>('POSTGRES_PASSWORD')?.replace(/^['"]|['"]$/g, ''),
        database: 'postgres',
        entities: [User, Session],
      }),
    }),
    AuthModule,
    HealthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
