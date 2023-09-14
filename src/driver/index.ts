import { type Elysia } from 'elysia';

import { Whatsapp } from './whatsapp';

export interface Driver<
  T extends string = '',
  K extends Elysia<T> = Elysia<T>
> {
  plugin(): K;
}

export const Drivers = {
  whatsapp: Whatsapp,
} as const;
