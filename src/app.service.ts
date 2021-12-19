import { jsonEvent } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hello } from './app.interface';
import { AppRepository } from './app.repository';
import { EventStoreProvider } from './eventstore/eventstore.provider';

export enum COMMAND_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Injectable()
export class AppService {
  constructor(
    private readonly eventStore: EventStoreProvider,
    @InjectRepository(AppRepository) private readonly repository: AppRepository,
  ) {}

  async saveHello(data: Hello): Promise<Hello> {
    const result = await this.repository.save({ name: data.name });
    if (!result) {
      // ERROR OH NO
      throw new Error('SHIT');
    }
    await this.eventStore.append(
      'hello-service',
      jsonEvent({
        type: COMMAND_TYPE.CREATE,
        data: {
          ...data,
        },
      }),
    );
    return result;
  }
}
