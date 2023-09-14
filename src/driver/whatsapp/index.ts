import { App } from '@/app';
import makeWASocket, {
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  type UserFacingSocketConfig,
} from '@whiskeysockets/baileys/src';
import path from 'path/posix';
import { Driver } from '..';
import Elysia from 'elysia';

export class Whatsapp implements Driver {
  public store: ReturnType<typeof makeInMemoryStore>;
  public socket?: ReturnType<typeof makeWASocket>;
  public initialized = false;

  constructor(public readonly app: App, config?: UserFacingSocketConfig) {
    this.store = makeInMemoryStore({});
    this.readFileStore();

    this.init();
  }

  private async init() {
    const { state, saveCreds } = await useMultiFileAuthState(
      path.join(Whatsapp.getDir(), 'baileys_auth_info')
    );
    const { version, isLatest } = await fetchLatestBaileysVersion();

    this.app.logger.info(`Baileys version: ${version.join('.')}`);

    if (!isLatest) {
      this.app.logger.warn('Baileys is not latest version!');
    }

    this.socket = makeWASocket({
      version,
      printQRInTerminal: true,
      // mobile: true,
      auth: {
        creds: state.creds,
        // @ts-ignore
        keys: makeCacheableSignalKeyStore(state.keys, this.app.logger),
      },
    });

    this.store.bind(this.socket.ev);
  }

  private readFileStore() {
    try {
      const file = path.join(Whatsapp.getDir(), 'multistore.json');

      this.store.readFromFile(file);
    } catch (err) {
      this.app.logger.error(err);
    }
  }

  public static getDir() {
    return path.join(import.meta.dir, '..', '..', '..', '.baileys');
  }

  // @ts-ignore
  public plugin() {
    return new Elysia().group('/whatsapp', (group) =>
      group.get('/', () => 'Hello from Whatsapp driver!')
    );
  }
}
