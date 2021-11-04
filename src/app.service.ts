import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly repository: AppRepository) {}

  async getHello(name: string): Promise<string> {
    const hello = await this.repository.findOne({ name });
    if (!hello)
      throw new HttpException(
        `Shit! There is no ${name}!`,
        HttpStatus.NOT_FOUND,
      );

    return `Hello World! ${hello.name}`;
  }
}
