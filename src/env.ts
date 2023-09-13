import { z } from 'zod';

export const envValidator = z.object({
  PORT: z.union([z.string(), z.number()]).default('3000'),
  WEBHOOK_URL: z.string(),
});

export type Env = z.infer<typeof envValidator>;

const parseEnv = () => {
  try {
    return envValidator.parse(process.env);
  } catch (err) {
    console.log('asd');
  }
};

export const env = parseEnv()!;
