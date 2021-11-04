import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloByName, HelloResult } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @GrpcMethod('HelloService', 'Greet')
  async greet(data: HelloByName): Promise<HelloResult> {
    const result = await this.service.getHello(data.name);
    return { result };
  }
}
