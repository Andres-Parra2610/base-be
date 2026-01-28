import { IBaseRepository } from "@/shared/domain/ports/base-repository.port";
import { UserModel } from "../models/user.model";

export interface IUserRepository extends IBaseRepository<UserModel> {
    findByEmail(email: string): Promise<UserModel | null>;
}