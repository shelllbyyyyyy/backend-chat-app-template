import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from './controller/http.module';

import { SocketIOModule } from './gateways/socket-io/socket-io.module';

interface DatabaseOptions {
  global?: boolean;
}

@Module({})
export class PresentationModule {
  static async register({
    global = false,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: PresentationModule,
      imports: [HttpModule, SocketIOModule],
      exports: [HttpModule, SocketIOModule],
    };
  }
}
