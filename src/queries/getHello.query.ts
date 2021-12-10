import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AppService } from '../app.service';
import { HelloByName, HelloResult } from '../app.interface';

export class GetHelloQuery {
  constructor(public readonly data: HelloByName) {}
}

@QueryHandler(GetHelloQuery)
export class GetHelloHandler implements IQueryHandler<GetHelloQuery> {
  constructor(private readonly service: AppService) {}

  async execute(query: GetHelloQuery) {
    console.log('Get Hello Query');
    return this.service.getHello(query.data.name);
  }
}
