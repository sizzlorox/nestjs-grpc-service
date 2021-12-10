import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HelloByName, HelloResult } from './app.interface';
import { GetHelloQuery } from './queries/getHello.query';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('HelloService', 'Greet')
  async greet(data: HelloByName): Promise<HelloResult> {
    const result = await this.queryBus.execute(new GetHelloQuery(data));
    return { result };
  }
}
