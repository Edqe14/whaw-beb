import consola, { type ConsolaInstance } from 'consola';
import { ServerFactory, type Server, DriverInstances } from '@/server';
import { Env } from '@/env';
import { Drivers } from '@/driver';

export class App {
  elysia: Server;
  logger: ConsolaInstance;

  constructor(
    public readonly port: Env['PORT'],
    public readonly drivers: (keyof typeof Drivers)[]
  ) {
    this.elysia = ServerFactory.create(
      drivers
        .map((name) => Drivers[name])
        .map((Driver) => new Driver(this)) as DriverInstances
    );
    this.logger = consola;

    this.listen();
  }

  private listen() {
    this.elysia.listen(this.port, (ev) => {
      this.logger.info(
        `Server is running at http://${ev?.hostname}:${ev?.port}`
      );
    });
  }
}
