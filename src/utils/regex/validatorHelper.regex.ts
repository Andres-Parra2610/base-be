import {
  creditCardSimpleRegex,
  currencyRegex,
  dateIsoRegex,
  emailRegex,
  fullNameRegex,
  hexColorRegex,
  ipv4Regex,
  passwordStrongRegex,
  slugRegex,
  urlRegex,
  usernameRegex,
  uuidV4Regex,
} from './validators.regex';

const PATTERNS = {
  email: emailRegex,
  password: passwordStrongRegex,
  username: usernameRegex,
  fullName: fullNameRegex,
  url: urlRegex,
  uuid: uuidV4Regex,
  date: dateIsoRegex,
  hexColor: hexColorRegex,
  slug: slugRegex,
  ipv4: ipv4Regex,
  currency: currencyRegex,
  creditCard: creditCardSimpleRegex,
};

export type ValidatorType = keyof typeof PATTERNS;

const DEFAULT_MESSAGES = {
  email: 'El correo electrónico es inválido',
  password:
    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
  username: 'El nombre de usuario debe tener al menos 3 caracteres y máximo 16 caracteres',
  fullName: 'El nombre completo debe tener al menos 3 caracteres y máximo 16 caracteres',
  url: 'La URL es inválida',
  uuid: 'El UUID es inválido',
  date: 'La fecha es inválida',
  hexColor: 'El color es inválido',
  slug: 'El slug es inválido',
  ipv4: 'La dirección IP es inválida',
  currency: 'El precio es inválido',
  creditCard: 'El número de tarjeta es inválido',
};

export const validateRegex = (value: string, type: ValidatorType, customMessage?: string) => {
  const valueToTest = value ? value.trim() : '';

  if (!valueToTest) return null;

  const isValid = PATTERNS[type].test(valueToTest);

  return isValid ? null : customMessage || DEFAULT_MESSAGES[type];
};
