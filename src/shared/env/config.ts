import { get } from 'env-var';

import { loadEnv } from './env';

loadEnv();

export const getRequired = (env: string) => get(env).required();

export const config = {
  get databaseUrl() {
    return getRequired('DATABASE_URL').asString();
  },
  get accessTokenSecret() {
    return getRequired('ACCESS_TOKEN_SECRET').asString();
  },
  get refreshTokenSecret() {
    return getRequired('REFRESH_TOKEN_SECRET').asString();
  },
  get bcryptSaltRounds() {
    return getRequired('BCRYPT_SALT_ROUNDS').asInt();
  },
  get baseUrl() {
    return getRequired('CLIENT_BASE_URL').asString();
  },
  get emailAdmin() {
    return getRequired('EMAIL_ADMIN').asString();
  },
  get emailHost() {
    return getRequired('EMAIL_HOST').asString();
  },
  get emailUsername() {
    return getRequired('EMAIL_USERNAME').asString();
  },
  get emailPassword() {
    return getRequired('EMAIL_PASSWORD').asString();
  },
  get googleClientId() {
    return getRequired('GOOGLE_CLIENT_ID').asString();
  },
  get googleClientSecret() {
    return getRequired('GOOGLE_CLIENT_SECRET').asString();
  },
};
