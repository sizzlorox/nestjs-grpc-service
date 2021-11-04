import { EntityRepository, Repository } from 'typeorm';
import { Hello } from './app.entity';

@EntityRepository(Hello)
export class AppRepository extends Repository<Hello> {}
