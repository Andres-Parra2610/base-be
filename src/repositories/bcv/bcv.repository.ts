import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BCV } from "src/shared/entities/bcv-entity";

@Injectable()
export class BCVRepository extends Repository<BCV> {
  constructor(private dataSource: DataSource) {
    super(BCV, dataSource.manager);
  }
}