import { plainToInstance } from 'class-transformer';
import { validate as validateClass } from 'class-validator';

type ValidateReturnError = {
  errors: string[];
};

type ValidateReturnSuccess<T extends object> = {
  data: T;
};

type ValidateReturn<T extends object> = ValidateReturnError | ValidateReturnSuccess<T>;

export async function validate<T extends object>(
  cls: new () => T,
  data: unknown,
  options: {
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    enableImplicitConversion?: boolean;
    exposeDefaultValues?: boolean;
  } = {
    whitelist: true,
    forbidNonWhitelisted: true,
    exposeDefaultValues: true,
  },
): Promise<ValidateReturn<T>> {
  const instance = plainToInstance(cls, data, {
    enableImplicitConversion: options.enableImplicitConversion,
    exposeDefaultValues: options.exposeDefaultValues,
  });

  const errors = await validateClass(instance, {
    whitelist: options.whitelist,
    forbidNonWhitelisted: options.forbidNonWhitelisted,
  });

  return errors.length ? { errors: errors.map((error) => error.toString()) } : { data: instance };
}
