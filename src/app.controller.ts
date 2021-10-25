import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloByName, HelloResult } from './app.interface';

@Controller()
export class AppController {
  @GrpcMethod('HelloService', 'Greet')
  greet(data: HelloByName): HelloResult {
    return { result: `Hello World, ${data.name}!` };
  }
}
