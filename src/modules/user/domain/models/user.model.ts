import { BaseModel } from "src/shared/domain/models/base.model";

export class UserModel extends BaseModel {
    fullName: string;
    email: string;
    password?: string;
    isStaff: boolean;

    constructor(id: string, createdAt: Date, updatedAt: Date, deletedAt: Date | null, createdBy: string | null, updatedBy: string | null, deletedBy: string | null, fullName: string, email: string, password: string, isStaff: boolean) {
        super(id, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.isStaff = isStaff;
    }
}