import { Injectable } from "@nestjs/common";
import { IUuidGenerationRepository } from "@/shared/domain/ports/uuid-generation-repository.port";
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class UuidGenerationService implements IUuidGenerationRepository {
    generate(): string {
        return uuidv4();
    }
}