import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  
  try {
    const seeder = appContext.get(SeedService);
    await seeder.seed();
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await appContext.close();
  }
}

bootstrap();
