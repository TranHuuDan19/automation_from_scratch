import dotenv from 'dotenv';
dotenv.config();

type EnvConfig = {
  baseURL: string;
  username: string;
  password: string;
};

const ENV = process.env.NODE_ENV || 'dev';

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error('Available ENV:', Object.keys(process.env));
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

const config: Record<string, EnvConfig> = {
  dev: {
    baseURL: getEnv('BASEURL'),
    username: getEnv('USERNAME'),
    password: getEnv('PASSWORD'),
  },
  staging: {
    baseURL: getEnv('BASEURL'),
    username: getEnv('USERNAME'),
    password: getEnv('PASSWORD'),
  },
  prod: {
    baseURL: getEnv('BASEURL'),
    username: getEnv('USERNAME'),
    password: getEnv('PASSWORD'),
  },
};

export default config[ENV];