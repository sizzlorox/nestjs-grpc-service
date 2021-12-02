import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Hello, HelloResult } from './app.interface';
import { GetHelloQuery } from './queries/getHello.query';
import { CreateHelloCommand } from './commands/createHello.command';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('HelloService', 'Greet')
  async greet(data: Hello): Promise<HelloResult> {
    const result = await this.queryBus.execute(new GetHelloQuery(data));
    return { result };
  }

  @GrpcMethod('HelloService', 'Create')
  async create(data: Hello): Promise<HelloResult> {
    const result = await this.commandBus.execute(new CreateHelloCommand(data));
    return { result };
  }
}
