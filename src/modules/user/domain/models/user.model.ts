import { BaseModel, BaseModelParams } from '@/src/shared/domain/models/base.model';
import { validateRegex } from '@/src/utils/regex/validatorHelper.regex';

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

    this.validateEmail(params.email);

    this.fullName = params.fullName;
    this.email = params.email;
    this.password = params.password;
    this.isStaff = params.isStaff;
  }

  private validateEmail(email: string) {
    const isValid = validateRegex(email, 'email');
    if (isValid) throw new Error(isValid);
  }

  static validatePassword(password: string) {
    const isValid = password.length >= 6;
    if (!isValid) throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
}
