import { createPrivateKey, createPublicKey } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';
import ms from 'ms';

export type ServiceName = 'auth';

class Environment {
  @IsIn(['development', 'production']) NODE_ENV = 'development';
  @IsIn(['debug', 'info', 'warn', 'error']) LOG_LEVEL = 'info';
  @Type(() => Number) @IsInt() @Min(0) @Max(3) TRUST_PROXY_HOPS = 0;
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.split(',').map((item) => item.trim()) : value,
  )
  @IsUrl(
    { require_tld: false, protocols: ['http', 'https'], require_protocol: true },
    { each: true },
  )
  CORS_ORIGINS!: string[];
  @IsIn(['true', 'false']) SWAGGER_ENABLED = 'false';
  @IsIn(['true', 'false']) REGISTRATION_ENABLED = 'false';
  @IsIn(['true', 'false']) DB_SYNCHRONIZE = 'true';
  @IsString() @IsNotEmpty() JWT_ISSUER!: string;
  @IsString() @IsNotEmpty() JWT_AUDIENCE!: string;
  @IsString() @IsNotEmpty() JWT_PUBLIC_KEY_FILE!: string;
  @IsString() @IsNotEmpty() JWT_PRIVATE_KEY_FILE!: string;
  @Type(() => Number) @IsInt() @Min(60) @Max(900) ACCESS_TOKEN_TTL_SECONDS = 900;
  @Type(() => Number) @IsInt() @Min(1) @Max(90) REFRESH_TOKEN_TTL_DAYS = 30;
  @Type(() => Number) @IsInt() @Min(10) @Max(15) BCRYPT_SALT_ROUNDS = 12;
  @Type(() => Number) @IsInt() @Min(0) @Max(30) JWT_CLOCK_TOLERANCE_SECONDS = 5;

  @IsString() @IsNotEmpty() HTTP_HOST = '0.0.0.0';
  @Type(() => Number) @IsInt() @Min(1) @Max(10_485_760) HTTP_BODY_LIMIT_BYTES = 262_144;
  @Type(() => Number) @IsInt() @Min(1) @Max(300_000) HTTP_REQUEST_TIMEOUT_MS = 30_000;
  @Type(() => Number) @IsInt() @Min(1) @Max(300_000) HTTP_HEADERS_TIMEOUT_MS = 35_000;
  @Type(() => Number) @IsInt() @Min(1) @Max(300_000) HTTP_KEEP_ALIVE_TIMEOUT_MS = 5000;
  @Type(() => Number) @IsInt() @Min(1000) @Max(3_600_000) HTTP_THROTTLE_TTL_MS = 60_000;
  @Type(() => Number) @IsInt() @Min(1) @Max(100_000) HTTP_THROTTLE_LIMIT = 120;

  @Type(() => Number) @IsInt() @Min(1) @Max(100) DB_POOL_MAX = 10;
  @Type(() => Number) @IsInt() @Min(1) @Max(10) DB_RETRY_ATTEMPTS = 3;
  @Type(() => Number) @IsInt() @Min(100) @Max(60_000) DB_RETRY_DELAY_MS = 2000;
  @Type(() => Number) @IsInt() @Min(100) @Max(300_000) DB_CONNECTION_TIMEOUT_MS = 5000;
  @Type(() => Number) @IsInt() @Min(100) @Max(300_000) DB_IDLE_TIMEOUT_MS = 30_000;
  @Type(() => Number) @IsInt() @Min(100) @Max(300_000) DB_STATEMENT_TIMEOUT_MS = 15_000;
  @Type(() => Number) @IsInt() @Min(100) @Max(300_000) DB_LOCK_TIMEOUT_MS = 5000;

  @IsUrl({ protocols: ['redis', 'rediss'], require_tld: false, require_protocol: true })
  REDIS_URI!: string;
  @Type(() => Number) @IsInt() @Min(100) @Max(60_000) REDIS_CONNECT_TIMEOUT_MS = 5000;
  @Type(() => Number) @IsInt() @Min(100) @Max(60_000) REDIS_COMMAND_TIMEOUT_MS = 5000;
  @Type(() => Number) @IsInt() @Min(0) @Max(10) REDIS_RECONNECT_ATTEMPTS = 3;
  @Type(() => Number) @IsInt() @Min(100) @Max(10_000) REDIS_RECONNECT_DELAY_MS = 500;

  @IsString() @MinLength(32) SESSION_SECRET!: string;
  @IsString() @IsNotEmpty() SESSION_NAME = 'retcon.sid';
  @IsString() SESSION_DOMAIN = '';
  @IsString() @IsNotEmpty() SESSION_MAX_AGE = '7d';
  @IsIn(['true', 'false']) SESSION_HTTP_ONLY = 'true';
  @IsIn(['true', 'false']) SESSION_SECURE = 'true';
  @IsIn(['lax', 'strict', 'none']) SESSION_SAME_SITE: 'lax' | 'strict' | 'none' = 'lax';
  @IsString() @IsNotEmpty() SESSION_FOLDER = 'retcon:session:';

  @IsUrl({ protocols: ['postgres', 'postgresql'], require_tld: false, require_protocol: true })
  databaseUrl!: string;
  @Type(() => Number) @IsInt() @Min(1) @Max(65535) port!: number;
}

export function createConfiguration(service: ServiceName) {
  const prefix = service.toUpperCase();
  const env = plainToInstance(Environment, {
    ...process.env,
    databaseUrl: process.env[`${prefix}_DATABASE_URL`],
    port: process.env[`${prefix}_PORT`],
  });
  const errors = validateSync(env, { validationError: { target: false, value: false } });
  if (errors.length)
    throw new Error(`Invalid environment: ${errors.map((error) => error.property).join(', ')}`);

  const sessionMaxAgeMs = ms(env.SESSION_MAX_AGE as ms.StringValue);
  if (!Number.isSafeInteger(sessionMaxAgeMs) || sessionMaxAgeMs <= 0)
    throw new Error('SESSION_MAX_AGE must be a positive duration such as 7d');
  if (env.SESSION_SAME_SITE === 'none' && env.SESSION_SECURE !== 'true')
    throw new Error('SameSite=None requires SESSION_SECURE=true');
  if (
    env.NODE_ENV === 'production' &&
    (env.SESSION_SECURE !== 'true' || env.SESSION_HTTP_ONLY !== 'true')
  )
    throw new Error('Production sessions require secure and HttpOnly cookies');

  const publicKey = readFileSync(env.JWT_PUBLIC_KEY_FILE, 'utf8');
  const parsedPublicKey = createPublicKey(publicKey);
  if (
    parsedPublicKey.asymmetricKeyType !== 'rsa' ||
    (parsedPublicKey.asymmetricKeyDetails?.modulusLength ?? 0) < 3072
  )
    throw new Error('JWT requires an RSA key of at least 3072 bits');

  const privateKey = readFileSync(env.JWT_PRIVATE_KEY_FILE, 'utf8');
  if (!createPublicKey(createPrivateKey(privateKey)).equals(parsedPublicKey))
    throw new Error('JWT key pair does not match');
  if (env.NODE_ENV === 'production' && env.SWAGGER_ENABLED === 'true')
    throw new Error('Public Swagger must be disabled in production');

  return {
    service,
    http: {
      port: env.port,
      host: env.HTTP_HOST,
      logLevel: env.LOG_LEVEL,
      trustProxyHops: env.TRUST_PROXY_HOPS,
      origins: env.CORS_ORIGINS,
      swaggerEnabled: env.SWAGGER_ENABLED === 'true',
      bodyLimitBytes: env.HTTP_BODY_LIMIT_BYTES,
      requestTimeoutMs: env.HTTP_REQUEST_TIMEOUT_MS,
      headersTimeoutMs: env.HTTP_HEADERS_TIMEOUT_MS,
      keepAliveTimeoutMs: env.HTTP_KEEP_ALIVE_TIMEOUT_MS,
      throttleTtlMs: env.HTTP_THROTTLE_TTL_MS,
      throttleLimit: env.HTTP_THROTTLE_LIMIT,
    },
    database: {
      url: env.databaseUrl,
      synchronize: env.NODE_ENV === 'development' && env.DB_SYNCHRONIZE === 'true',
      poolMax: env.DB_POOL_MAX,
      retryAttempts: env.DB_RETRY_ATTEMPTS,
      retryDelayMs: env.DB_RETRY_DELAY_MS,
      connectionTimeoutMs: env.DB_CONNECTION_TIMEOUT_MS,
      idleTimeoutMs: env.DB_IDLE_TIMEOUT_MS,
      statementTimeoutMs: env.DB_STATEMENT_TIMEOUT_MS,
      lockTimeoutMs: env.DB_LOCK_TIMEOUT_MS,
    },
    redis: {
      uri: env.REDIS_URI,
      connectTimeoutMs: env.REDIS_CONNECT_TIMEOUT_MS,
      commandTimeoutMs: env.REDIS_COMMAND_TIMEOUT_MS,
      reconnectAttempts: env.REDIS_RECONNECT_ATTEMPTS,
      reconnectDelayMs: env.REDIS_RECONNECT_DELAY_MS,
    },
    session: {
      secret: env.SESSION_SECRET,
      name: env.SESSION_NAME,
      domain: env.SESSION_DOMAIN,
      maxAgeMs: sessionMaxAgeMs,
      httpOnly: env.SESSION_HTTP_ONLY === 'true',
      secure: env.SESSION_SECURE === 'true',
      sameSite: env.SESSION_SAME_SITE,
      prefix: env.SESSION_FOLDER,
    },
    jwt: {
      publicKey,
      privateKey,
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
      accessTokenTtlSeconds: env.ACCESS_TOKEN_TTL_SECONDS,
      clockToleranceSeconds: env.JWT_CLOCK_TOLERANCE_SECONDS,
    },
    auth: {
      registrationEnabled: env.REGISTRATION_ENABLED === 'true',
      bcryptSaltRounds: env.BCRYPT_SALT_ROUNDS,
      refreshTokenTtlDays: env.REFRESH_TOKEN_TTL_DAYS,
    },
  };
}
