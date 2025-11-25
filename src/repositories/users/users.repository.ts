import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/entities/user.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "../base.repository";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}
