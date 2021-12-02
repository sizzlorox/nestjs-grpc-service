import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AppRepository } from 'src/app.repository';
import { CreateHelloEvent } from 'src/events/CreateHello.event';
import { Hello } from '../app.interface';

export class CreateHelloCommand {
  constructor(public readonly data: Hello) {}
}

@CommandHandler(CreateHelloCommand)
export class CreateHelloHandler implements ICommandHandler<CreateHelloCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly repository: AppRepository,
  ) {}

  async execute(command: CreateHelloCommand): Promise<string> {
    const { data } = command;
    await this.repository.save({ name: data.name });
    await this.eventBus.publish(new CreateHelloEvent(data.name));

    return 'Created';
  }
}
