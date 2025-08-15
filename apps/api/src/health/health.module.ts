import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';

function stripQuotes(value: string | undefined): string {
  if (!value) throw new Error('Env var is undefined');
  return value.replace(/^['"]|['"]$/g, '');
}

@Module({
  imports: [
    ConfigModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: stripQuotes(config.get<string>('POSTGRES_HOST')),
        port: parseInt(stripQuotes(config.get<string>('POSTGRES_PORT')), 10),
        username: stripQuotes(config.get<string>('POSTGRES_USER')),
        password: stripQuotes(config.get<string>('POSTGRES_PASSWORD')),
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
