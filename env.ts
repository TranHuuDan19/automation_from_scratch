import { EnvironmentConfiguration } from "./utils/config/environment";

type EnvName = 'test' | 'production';
type RoleName = 'user' | 'admin';

const defineEnv: Record<EnvName, Record<RoleName, EnvironmentConfiguration>> = {
  test: {
    user: new EnvironmentConfiguration('tiger_user', 'Tiger@123ewq'),
    admin: new EnvironmentConfiguration('Admin', 'admin123'),
  },
  production: {
    user: new EnvironmentConfiguration('prod_user', 'prod_password'),
    admin: new EnvironmentConfiguration('prod_admin', 'prod_password'),
  }
};

export function getEnvironmentValue(role: RoleName): EnvironmentConfiguration {
  const env = (process.env.NODE_ENV === 'production' ? 'production' : 'test') as EnvName;
  console.log(`--- Current environment: ${env}, role: ${role}`);
  return defineEnv[env][role];
}