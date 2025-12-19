"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seed_module_1 = require("./seed/seed.module");
const seed_service_1 = require("./seed/seed.service");
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(seed_module_1.SeedModule);
    try {
        const seeder = appContext.get(seed_service_1.SeedService);
        await seeder.seed();
    }
    catch (error) {
        console.error('Seeding failed:', error);
    }
    finally {
        await appContext.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map