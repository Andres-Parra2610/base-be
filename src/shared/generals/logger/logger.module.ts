import { env } from "@/src/config/env";
import { Global, Logger, Module, Provider } from "@nestjs/common";

const loggerProvider: Provider = {
  provide: Logger,
  useFactory: () => {
    const level = env.LOGGER_LEVEL;
    const logger = new Logger();
    logger.localInstance.setLogLevels?.(level);
    return logger;
  },
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}