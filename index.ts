import { App } from '@/app';
import { env } from '@/env';

const app = new App(env.PORT, ['whatsapp']);
