import { Hello } from 'src/app.interface';

export class CreateHelloEvent {
  constructor(public readonly data: Hello) {}
}
