import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUrl, Max, Min, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  NEST_PORT: number;

  @IsUrl({ require_tld: false })
  NEST_CORS_ORIGIN: string;

  @IsString()
  NEST_MISTRAL_API_KEY: string;
}

export function validateEnvironment(config: Record<string, unknown>): EnvironmentVariables {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors.toString()}`);
  }

  return validateConfig;
}
