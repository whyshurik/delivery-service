import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export function IsJsonWithFields(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isJsonWithFields',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    try {
                        const json = JSON.parse(value);
                        if (!Array.isArray(json)) {
                            return false
                        }
                        for (const item of json) {
                            if (typeof item !== 'object' || !item.hasOwnProperty('quantity') || !item.hasOwnProperty('productId')) {
                                return false;
                            }
                        }
                    } catch {
                        return false;
                    }
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid JSON string with fields quantity (number) and productId (string)`;
                }
            },
        });
    };
}