import { GeneralModule } from "./modules/general/general.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RepositoriesModule } from "./repositories/repositories.module";
import { SharedModule } from "./shared/modules/shared.module";

export const APP_MODULES = [
  GeneralModule,
  UsersModule,
  AuthModule,
  SharedModule,
  RepositoriesModule
]