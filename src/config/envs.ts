import * as Joi from 'joi';

interface EnvConfig {
  PORT: number;
  USERS_API_BASE_URL: string;
  ADMON_API_BASE_URL: string;
  SOCKER_URL: string;
  GOOGLE_CLIENT_ID: string;
}

const envSchema = Joi.object({
  VITE_PORT: Joi.number().default(5173),
  VITE_USERS_API_BASE_URL: Joi.string().required(),
  VITE_ADMON_API_BASE_URL: Joi.string().required(),
  VITE_SOCKER_URL: Joi.string().required(),
  VITE_GOOGLE_CLIENT_ID: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(import.meta.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envConfig: EnvConfig = {
  PORT: Number(value.VITE_PORT),
  USERS_API_BASE_URL: value.VITE_USERS_API_BASE_URL,
  ADMON_API_BASE_URL: value.VITE_ADMON_API_BASE_URL,
  GOOGLE_CLIENT_ID: value.VITE_GOOGLE_CLIENT_ID,
  SOCKER_URL: value.VITE_SOCKER_URL,
};

export const envs = {
  port: envConfig.PORT,
  usersApiBaseUrl: envConfig.USERS_API_BASE_URL,
  adminApiBaseUrl: envConfig.ADMON_API_BASE_URL,
  googleClientId: envConfig.GOOGLE_CLIENT_ID,
  socketUrl: envConfig.SOCKER_URL,
};
