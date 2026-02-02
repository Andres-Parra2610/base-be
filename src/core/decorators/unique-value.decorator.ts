import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsUniqueValue(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'IsUniqueValue',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown[]): boolean {
          if (Array.isArray(value) && value.length === 0) return true;

          if (!Array.isArray(value)) return false;

          return new Set(value).size === value.length;
        },

        defaultMessage(): string {
          return 'The value must be unique.';
        },
      },
    });
}
