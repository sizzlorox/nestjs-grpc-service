import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Hello } from './app.interface';
import { AppRepository } from './app.repository';

export enum COMMAND_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface EVENTSTORE_FACT {
  command: COMMAND_TYPE;
  service: string;
  result: Hello | null;
}

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('EVENT_STORE') private readonly kafka: ClientKafka,
    @InjectRepository(AppRepository) private readonly repository: AppRepository,
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  onModuleDestroy() {
    this.kafka.close();
  }

  async saveHello(data: Hello): Promise<Hello> {
    console.log('1');
    const result = await this.repository.save({ name: data.name });
    if (!result) {
      // ERROR OH NO
      throw new Error('SHIT');
    }
    console.log('2');
    const fact: EVENTSTORE_FACT = {
      command: COMMAND_TYPE.CREATE,
      // Get service name from config maybe
      service: 'hello.service',
      result,
    };
    this.kafka.emit('event.store', fact);
    console.log('3');

    return result;
  }
}
