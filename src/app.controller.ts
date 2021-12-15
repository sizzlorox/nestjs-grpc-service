import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Hello, HelloResult } from './app.interface';
import { GetHelloQuery } from './queries/getHello.query';
import { CreateHelloCommand } from './commands/CreateHello.command';
import { Message } from '@nestjs/microservices/external/kafka.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly service: AppService,
  ) {}

  // QUERIES
  @GrpcMethod('HelloService', 'Greet')
  async greet(data: Hello): Promise<HelloResult> {
    const result = await this.queryBus.execute(new GetHelloQuery(data));
    return { result };
  }

  // COMMANDS
  @GrpcMethod('HelloService', 'Create')
  async create(data: Hello): Promise<void> {
    await this.commandBus.execute(new CreateHelloCommand(data));
  }

  @MessagePattern('event.store')
  async saveHello(message: Message) {
    const data = JSON.parse(message.value.toString()) as Hello;
    console.log(data);
  }
}
