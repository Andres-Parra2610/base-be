import { Injectable, NotFoundException } from "@nestjs/common";
import { StateRepository } from "src/repositories/states/states.repository";

@Injectable()
export class FindAllStatesUseCase {
  constructor(private readonly repository: StateRepository) { }

  async execute(id?: string) {
    if (!id) return await this.repository.find();
    return await this.repository.findOne({ where: { id } });
  }
}
