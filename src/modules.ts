import { UserModule } from "./modules/user/user.module";
import { LoggerModule } from "./shared/generals/logger/logger.module";
import { HealthCheckModule } from "./modules/healthcheck/healthcheck.module";

export const APP_MODULES = [
LoggerModule,
HealthCheckModule,
UserModule,
]