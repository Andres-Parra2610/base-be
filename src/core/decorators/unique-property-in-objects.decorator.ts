import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsUniquePropertyInObject<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUniquePropertyInObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value !== relatedValue // Retorna true si los valores son diferentes
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return `${args.property} must be diferent ${relatedPropertyName}`
        },
      },
    })
  }
}