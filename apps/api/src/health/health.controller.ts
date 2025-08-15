import { Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      // Ping database
      () => this.db.pingCheck('postgres', { timeout: 3000 }),
      // Memory heap check
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.db.pingCheck('postgres', { timeout: 3000 }),
    ]);
  }

  @Get('metrics')
  getMetrics() {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }
}
