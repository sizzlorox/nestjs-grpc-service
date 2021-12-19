import { jsonEvent } from '@eventstore/db-client';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Hello } from 'src/app.interface';
import { AppService } from 'src/app.service';

export class CreateHelloCommand implements ICommand {
  constructor(public readonly data: Hello) {}
}

@CommandHandler(CreateHelloCommand)
export class CreateHelloHandler implements ICommandHandler<CreateHelloCommand> {
  constructor(private readonly service: AppService) {}

  async execute(command: CreateHelloCommand): Promise<void> {
    const { data } = command;
    console.log('Executing Create Hello Command');
    await this.service.saveHello(data);
  }
}
