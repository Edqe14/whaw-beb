import consola from 'consola';
import { ZodError, z } from 'zod';

export const envValidator = z.object({
  PORT: z.union([z.string(), z.number()]).default('3000'),
  WEBHOOK_URL: z.string(),
});

export type Env = z.infer<typeof envValidator>;

const parseEnv = () => {
  try {
    return envValidator.parse(process.env);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const first = err.errors[0];
      consola.error(
        `Invalid environment variables "${first.path[0]}": ${first.message}`
      );
    }

    process.exit(1);
  }
};

export const env = parseEnv()!;
