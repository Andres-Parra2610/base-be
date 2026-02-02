import { BaseModel, BaseModelParams } from '@/src/shared/domain/models/base.model';
import { DomainError } from '@/src/utils/errors/domain.error';
import { validateRegex } from '@/src/utils/regex/validatorHelper.regex';

export interface UserModelParams extends BaseModelParams {
  fullName: string;
  email: string;
  password?: string;
  isStaff: boolean;
}

export class UserModel extends BaseModel<UserModelParams> {
  fullName: string;
  email: string;
  password?: string;
  isStaff: boolean;

  constructor(params: UserModelParams) {
    super(params);

    this.validateEmail(params.email);
    this.validateFullName(params.fullName);

    this.fullName = params.fullName;
    this.email = params.email;
    this.password = params.password;
    this.isStaff = params.isStaff;
  }

  private validateEmail(email: string) {
    const isValid = validateRegex(email, 'email');
    if (isValid) throw new DomainError(isValid);
  }

  private validateFullName(fullName: string) {
    const isValid = validateRegex(fullName, 'fullName');
    if (isValid) throw new DomainError(isValid);
  }

  static validatePassword(password: string) {
    const isValid = password.length >= 6;
    if (!isValid) throw new DomainError('La contraseña debe tener al menos 6 caracteres');
  }
}
