import { Elysia } from 'elysia';

export class ServerFactory {
  public static create() {
    const server = new Elysia().get('/', () => 'Hello from Bun!');

    return server;
  }
}

export type Server = ReturnType<typeof ServerFactory.create>;
