import {
  AppendResult,
  EventData,
  EventStoreDBClient,
  EventType,
  FORWARDS,
  ResolvedEvent,
  START,
  StreamingRead,
} from '@eventstore/db-client';
import { ReadStreamOptions } from '@eventstore/db-client/dist/streams';
import { Logger } from '@nestjs/common';
import { ReadableOptions } from 'stream';

export class EventStoreProvider {
  private logger: Logger = new Logger(this.constructor.name);
  private client: EventStoreDBClient;

  constructor(host: string) {
    this.client = new EventStoreDBClient(
      {
        endpoint: host,
      },
      { insecure: true },
    );
  }

  async append(streamName: string, event: EventData): Promise<AppendResult> {
    this.logger.debug(`Appending to stream ${streamName}`, event);
    return this.client.appendToStream(streamName, event);
  }

  async readStream(
    streamName: string,
    options: ReadStreamOptions = {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 10,
    },
    readableOptions?: ReadableOptions,
  ): Promise<StreamingRead<ResolvedEvent<EventType>>> {
    this.logger.debug(`Reading from stream ${streamName}`, options);
    return this.client.readStream(streamName, options, readableOptions);
  }
}
