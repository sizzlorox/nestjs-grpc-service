import { DynamicModule, Global, Module } from '@nestjs/common';
import { EventStoreProvider } from './eventstore.provider';

export interface EventStoreModuleAsyncOptions {
  imports?: any[];
  inject?: any[];
  useFactory: (...args: any[]) => Promise<any> | any;
}

@Global()
@Module({
  providers: [EventStoreProvider],
  exports: [EventStoreProvider],
})
export class EventStoreModule {
  static forRoot(host: string): DynamicModule {
    return {
      module: EventStoreModule,
      providers: [
        {
          provide: EventStoreProvider,
          useFactory: () => {
            return new EventStoreProvider(host);
          },
        },
      ],
      exports: [EventStoreProvider],
    };
  }

  static forRootAsync(options: EventStoreModuleAsyncOptions): DynamicModule {
    return {
      module: EventStoreModule,
      imports: options.imports,
      providers: [
        {
          inject: options.inject,
          provide: EventStoreProvider,
          useFactory: async (...args) => {
            const { host } = await options.useFactory(...args);
            return new EventStoreProvider(host);
          },
        },
      ],
      exports: [EventStoreProvider],
    };
  }
}
