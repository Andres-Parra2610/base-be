import { Injectable } from "@nestjs/common";
import { CityRepository } from "src/repositories/cities/cities.repository";

@Injectable()
export class FindAllCitiesUseCase {
  constructor(
    private readonly repository: CityRepository
  ) { }

  async execute(stateId?: string) {
    if (!stateId) return await this.repository.find();
    return await this.repository.find({ where: { stateId } });
  }
}
