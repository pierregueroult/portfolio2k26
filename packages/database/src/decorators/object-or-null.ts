import 'reflect-metadata';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsObjectOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsObjectOrNull',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (value === null) return true;
          return typeof value === 'object' && value !== null && !Array.isArray(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object or null`;
        },
      },
    });
  };
}
