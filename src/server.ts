import { Elysia } from 'elysia';
import { Drivers } from '@/driver';
import { pipe } from 'effect/Function';
import type { Tuple } from '@/types';

export type Instances = InstanceType<(typeof Drivers)[keyof typeof Drivers]>;
export type DriverInstances = Tuple<Instances, 10>;
export type PluginsPipe = Tuple<(instance: Elysia) => ReturnType<Instances['plugin']>, 10>;

export class ServerFactory {
  public static create(drivers: DriverInstances) {
    const plugins = drivers.map(
      (driver) => (instance: Elysia) => instance.use(driver.plugin())
    ) as PluginsPipe;

    // @ts-ignore
    const server = pipe(new Elysia(), ...plugins).get(
      '/',
      () => 'Hello from Bun!'
    );

    return server;
  }
}

export type Server = ReturnType<typeof ServerFactory.create>;
