import { type Elysia } from 'elysia';

import { Whatsapp } from './whatsapp';

export interface Driver<T extends Elysia = Elysia> {
  plugin(): T;
}

export const Drivers = {
  whatsapp: Whatsapp,
} as const;
