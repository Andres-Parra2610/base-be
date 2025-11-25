import { Injectable } from "@nestjs/common";
import { BCVRepository } from "src/repositories/bcv/bcv.repository";

@Injectable()
export class FindLastBCVUseCase {
  constructor(private readonly bcvRepository: BCVRepository) { }

  async execute() {
    const res = await this.bcvRepository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });

    return res ? res.amount : null;
  }
}