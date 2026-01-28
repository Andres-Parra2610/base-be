import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

interface IsUniquePropertyOptions<T> {
  properties?: (keyof T)[]
}

/**
 * Custom decorator to validate that a set of specified properties is unique within an array of objects.
 * Logs an error if any of the specified properties do not exist on any of the array objects.
 *
 * @param options - Options to specify the properties to check for uniqueness.
 * @param validationOptions - Additional validation options for class-validator.
 */
export function IsUniqueProperty<T>(options?: IsUniquePropertyOptions<T>, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'IsUniqueProperty',
      target: object.constructor,
      propertyName,
      constraints: [options],
      options: validationOptions,
      validator: {
        /**
         * Validates if the specified set of properties is unique within an array of objects.
         * Logs an error if any of the specified properties do not exist in the objects.
         *
         * @param value - The array to validate.
         * @returns true if all specified property values are unique, false otherwise.
         */
        validate(value: unknown[]): boolean {
          // Ensure value is an array of objects

          if (Array.isArray(value) && value.length === 0) return true

          if (!Array.isArray(value) || typeof value[0] !== 'object') return false

          const properties = options?.properties || ['id']

          // Filter out items where all specified properties are undefined
          const filteredItems = value.filter((item) => properties.some((property) => (item as any)[property] !== undefined))

          // Generate unique keys based on the specified properties
          const uniqueKeys = new Set(
            filteredItems.map((item) =>
              properties
                .filter((property) => property)
                .map((property) => (item as any)[property])
                .join('|'),
            ),
          )

          return uniqueKeys.size === filteredItems.length
        },

        /**
         * Provides a default error message based on validation results.
         *
         * @param args - Validation arguments provided by class-validator.
         * @returns A specific error message based on the failure reason.
         */
        defaultMessage(args: ValidationArguments): string {
          const value = args.value
          const properties = args.constraints[0]?.properties || ['id']
          // Error message for non-array values
          if (!Array.isArray(value)) return 'The value must be an array.'

          // Error message for non-object array elements
          if (typeof value[0] !== 'object') return 'Each element in the array must be an object.'

          // Default uniqueness error message
          return `The combination of properties ${properties.join(', ')} in '${args.property}' must be unique.`
        },
      },
    })
}