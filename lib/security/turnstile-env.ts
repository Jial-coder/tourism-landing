type EnvLike = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

export function requiresTurnstileSecret(env: EnvLike = process.env): boolean {
  const vercelEnv = env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === 'production';
  return env.NODE_ENV === 'production';
}
