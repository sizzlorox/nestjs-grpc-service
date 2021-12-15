import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { CreateHelloEvent } from 'src/events/CreateHello.event';

@Injectable()
export class HelloSagas {
  constructor() {}

  // SAGA
  // -----------------------------------------------------------------------------------
  @Saga()
  helloCreate = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(CreateHelloEvent),
      map(async () => {}),
    );
  };
}
