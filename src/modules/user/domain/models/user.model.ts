import { BaseModel, BaseModelParams } from "@/src/shared/domain/models/base.model";

interface UserModelParams extends BaseModelParams {
    fullName: string;
    email: string;
    password?: string;
    isStaff: boolean;
}

export class UserModel extends BaseModel {
    fullName: string;
    email: string;
    password?: string;
    isStaff: boolean;

    constructor(params: UserModelParams) {
        super(params);
        this.fullName = params.fullName;
        this.email = params.email;
        this.password = params.password;
        this.isStaff = params.isStaff;
    }
}
