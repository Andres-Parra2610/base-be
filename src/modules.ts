import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './core/logger/logger.module';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';

export const APP_MODULES = [LoggerModule, HealthCheckModule, UserModule];
