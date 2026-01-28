import { Module } from "@nestjs/common";
import { HealthCheckController } from "./healtchCheck.controller";

@Module({
    controllers: [
        HealthCheckController
    ]
})
export class HealthCheckModule {}