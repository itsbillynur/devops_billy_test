const apm = require('elastic-apm-node').start({
  serviceName: 'devops-test-api',
  serverUrl: 'http://host.docker.internal:8200',
  captureBody: 'all',
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
