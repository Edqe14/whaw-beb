import consola, { type ConsolaInstance } from 'consola';
import { ServerFactory, type Server } from './server';
import { Env } from '@/env';

export class App {
  elysia: Server;
  logger: ConsolaInstance;

  constructor(public port: Env['PORT']) {
    this.elysia = ServerFactory.create();
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
