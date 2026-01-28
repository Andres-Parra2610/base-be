import { BaseModel } from "src/shared/domain/models/base.model";

export class UserModel extends BaseModel {
    name: string;
    email: string;
    password: string;
    isStaff: boolean;

    constructor(id: string, createdAt: Date, updatedAt: Date, deletedAt: Date | null, createdBy: string | null, updatedBy: string | null, deletedBy: string | null, name: string, email: string, password: string, isStaff: boolean) {
        super(id, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
        this.name = name;
        this.email = email;
        this.password = password;
        this.isStaff = isStaff;
    }
}