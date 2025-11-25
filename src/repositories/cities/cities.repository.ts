import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { City } from "src/shared/entities/city.entity";

@Injectable()
export class CityRepository extends Repository<City> {
  constructor(private dataSource: DataSource) {
    super(City, dataSource.manager);
  }
}