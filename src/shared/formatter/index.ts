import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFormattedDate', async: false })
export class IsFormattedDateConstraint implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    // Check if the date is in YYYY-MM-DD format
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date ($value) must be in YYYY-MM-DD format';
  }
}

export function IsFormattedDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFormattedDateConstraint,
    });
  };
}
