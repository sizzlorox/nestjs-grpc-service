import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Hello } from '../app.interface';
import { AppRepository } from 'src/app.repository';

export class GetHelloQuery {
  constructor(public readonly data: Hello) {}
}

@QueryHandler(GetHelloQuery)
export class GetHelloHandler implements IQueryHandler<GetHelloQuery> {
  constructor(private readonly repository: AppRepository) {}

  async execute(query: GetHelloQuery) {
    const { data } = query;
    const hello = await this.repository.findOne({ name: data.name });

    return `Hello World! ${hello.name}`;
  }
}
