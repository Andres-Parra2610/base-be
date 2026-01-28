import { UserModule } from "./modules/user/user.module";
import { LoggerModule } from "./shared/generals/logger/logger.module";
import { DatabaseModule } from "./shared/infrastructure/persistent/typeorm/database.module";

export const APP_MODULES = [
LoggerModule,
  UserModule,
]